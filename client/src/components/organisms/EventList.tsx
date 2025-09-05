"use client";

import { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import EventCard from "@/components/molecules/EventCard";
import Loader from "@/components/atoms/Loader";
import { Event } from "@/services/types/Types";
import { useEvents } from "@/contexts/EventsProviders";
import { useAuth } from "@/contexts/hooks/auth";

const MySwal = withReactContent(Swal);

interface EventListProps {
  events: Event[];
  showDelete?: boolean;
  loading?: boolean;
}

export default function EventList({
  events,
  showDelete = false,
  loading = false,
}: EventListProps) {
  const { deleteEvent, rsvpEvent } = useEvents();
  const { user } = useAuth();
  const [rsvpedEvents, setRsvpedEvents] = useState<Set<string>>(new Set());

  const handleRsvp = async (eventId: string) => {
    if (!user) {
      const result = await MySwal.fire({
        title: "Login Required",
        text: "You need to be logged in to RSVP to events. Would you like to login now?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#8B5CF6",
        cancelButtonColor: "#EF4444",
        confirmButtonText: "Login",
        cancelButtonText: "Cancel",
      });

      if (result.isConfirmed) {
        window.location.href = "/login";
      }
      return;
    }

    try {
      await rsvpEvent(eventId);
      setRsvpedEvents((prev) => new Set(prev).add(eventId));

      await MySwal.fire({
        title: "RSVP Successful!",
        text: "You have successfully RSVP'd to this event.",
        icon: "success",
        confirmButtonColor: "#8B5CF6",
      });
    } catch (error: unknown) {
      let message =
        "An error occurred while trying to RSVP. Please try again later.";

      if (error && typeof error === "object" && "response" in error) {
        const axiosError = error as any;
        if (axiosError.response?.data?.message) {
          message = axiosError.response.data.message;
        }
      }

      await MySwal.fire({
        title: "RSVP Failed",
        text: message,
        icon: "error",
        confirmButtonColor: "#8B5CF6",
      });
    }
  };

  const handleDelete = async (eventId: string) => {
    const result = await MySwal.fire({
      title: "Confirm Delete",
      text: "Are you sure you want to delete this event?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#8B5CF6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed && deleteEvent) {
      try {
        await deleteEvent(eventId);
        await MySwal.fire({
          title: "Deleted!",
          text: "The event has been deleted.",
          icon: "success",
          confirmButtonColor: "#8B5CF6",
        });
      } catch (error) {
        await MySwal.fire({
          title: "Error",
          text: "Failed to delete the event. Please try again.",
          icon: "error",
          confirmButtonColor: "#8B5CF6",
        });
      }
    }
  };

  if (loading) {
    return <Loader fullScreen message="Loading events..." />;
  }

  if (events.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
        <h3 className="text-xl font-medium text-gray-900 mb-1">
          No events found
        </h3>
        <p className="text-gray-500">
          There are no events to display at the moment.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          onRsvp={handleRsvp}
          onDelete={handleDelete}
          showDelete={showDelete}
        />
      ))}
    </div>
  );
}
