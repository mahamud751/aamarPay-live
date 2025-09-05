"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { AxiosError } from "axios";

import { useAuth } from "@/contexts/hooks/auth";
import {
  getUserEvents,
  getEvents,
  deleteEvent,
  rsvpEvent,
} from "@/services/apis/eventsOptimized";
import { Event } from "@/services/types/Types";

const MySwal = withReactContent(Swal);

const EventList = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const router = useRouter();
  const isOwnEvent = (event: Event) => user && event.userId === user.id;

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const response = user ? await getUserEvents() : await getEvents();
        setEvents(response.data);
      } catch (err: unknown) {
        let message = "Failed to load event";
        if (err && typeof err === "object" && "response" in err) {
          const axiosError = err as AxiosError<{ message?: string }>;
          if (axiosError.response?.data?.message) {
            message = axiosError.response.data.message;
          }
        }
        MySwal.fire({
          icon: "error",
          title: "Error",
          text: message,
        });
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, [user]);

  const handleDelete = async (id: string) => {
    try {
      await deleteEvent(id);
      setEvents(events.filter((event) => event.id !== id));
      MySwal.fire({
        icon: "success",
        title: "Success",
        text: "Event deleted successfully",
      });
    } catch (err: unknown) {
      let message = "Failed to load event";
      if (err && typeof err === "object" && "response" in err) {
        const axiosError = err as AxiosError<{ message?: string }>;
        if (axiosError.response?.data?.message) {
          message = axiosError.response.data.message;
        }
      }
      MySwal.fire({
        icon: "error",
        title: "Error",
        text: message,
      });
    }
  };

  const handleRsvp = async (id: string) => {
    try {
      const response = await rsvpEvent(id);
      setEvents(
        events.map((event) => (event.id === id ? response.event : event))
      );
      MySwal.fire({
        icon: "success",
        title: "Success",
        text: "RSVP recorded successfully",
      });
    } catch (err: unknown) {
      let message = "Failed to load event";
      if (err && typeof err === "object" && "response" in err) {
        const axiosError = err as AxiosError<{ message?: string }>;
        if (axiosError.response?.data?.message) {
          message = axiosError.response.data.message;
        }
      }
      MySwal.fire({
        icon: "error",
        title: "Error",
        text: message,
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        {user ? "My Events" : "All Events"}
      </h1>
      {loading && (
        <div className="flex justify-center">
          <svg
            className="animate-spin h-8 w-8 text-primary"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      )}
      <button
        onClick={() => router.push("/events/new")}
        disabled={!user || loading}
        className="mb-4 bg-primary text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
      >
        Create Event
      </button>
      <ul className="space-y-4">
        {events.map((event) => (
          <li
            key={event.id}
            className="p-4 border border-gray-200 rounded-md shadow-sm flex justify-between items-center"
          >
            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                {event.title}
              </h2>
              <p className="text-sm text-gray-600">
                Date: {new Date(event.date).toLocaleDateString()} | Location:{" "}
                {event.location} | RSVPs: {event.rsvpCount}
              </p>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => router.push(`/events/${event.id}`)}
                className="bg-primary text-white py-1 px-3 rounded-md hover:bg-blue-700"
              >
                Details
              </button>
              {isOwnEvent(event) && (
                <button
                  onClick={() => router.push(`/events/edit/${event.id}`)}
                  className="bg-secondary text-white py-1 px-3 rounded-md hover:bg-gray-600"
                >
                  Edit
                </button>
              )}
              {isOwnEvent(event) && (
                <button
                  onClick={() => handleDelete(event.id)}
                  className="bg-error text-white py-1 px-3 rounded-md hover:bg-red-700"
                >
                  Delete
                </button>
              )}
              {user && (
                <button
                  onClick={() => handleRsvp(event.id)}
                  className="bg-success text-white py-1 px-3 rounded-md hover:bg-green-700"
                >
                  RSVP
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;
