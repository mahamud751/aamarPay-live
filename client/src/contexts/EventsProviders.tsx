"use client";

import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useCallback,
} from "react";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

import {
  getUserEvents,
  getEvents,
  rsvpEvent as rsvpEventApi,
  deleteEvent as deleteEventApi,
  updateEvent as updateEventApi,
  clearAllEventCache,
} from "@/services/apis/eventsOptimized";
import { createNotification } from "@/services/apis/notifications";
import { Event, UpdateEventDto } from "@/services/types/Types";
import { useAuth } from "@/contexts/hooks/auth";
import { handleAxiosError } from "@/services/utils/utils";

const MySwal = withReactContent(Swal);

interface EventsContextType {
  events: Event[];
  loading: boolean;
  fetchEvents: (fetchUserEvents: boolean) => Promise<void>;
  rsvpEvent: (id: string) => Promise<void>;
  deleteEvent: (id: string) => Promise<void>;
  updateEvent: (id: string, data: UpdateEventDto) => Promise<Event>;
}

const EventsContext = createContext<EventsContextType | undefined>(undefined);

export const useEvents = () => {
  const context = useContext(EventsContext);
  if (!context) {
    throw new Error("useEvents must be used within an EventsProvider");
  }
  return context;
};

interface EventsProviderProps {
  children: ReactNode;
}

export const EventsProvider: React.FC<EventsProviderProps> = ({ children }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const fetchEvents = useCallback(
    async (fetchUserEvents: boolean) => {
      // Use cache-first approach to reduce flickering
      // Only show loading state for initial load or when cache is empty
      const shouldShowLoading = events.length === 0;

      if (shouldShowLoading) {
        setLoading(true);
      }

      try {
        console.log(`Fetching ${fetchUserEvents ? "user" : "all"} events`);
        const startTime = Date.now();

        const response = fetchUserEvents
          ? await getUserEvents()
          : await getEvents();

        const duration = Date.now() - startTime;
        console.log(`Events fetch completed in ${duration}ms`);

        setEvents(response.data);
      } catch (err: unknown) {
        await handleAxiosError(err, "Failed to fetch events");
      } finally {
        setLoading(false);
      }
    },
    [events.length]
  );

  const rsvpEvent = useCallback(
    async (id: string) => {
      if (!user) {
        MySwal.fire({
          icon: "warning",
          title: "Login Required",
          text: "You need to be logged in to RSVP to events.",
        });
        return;
      }

      try {
        const response = await rsvpEventApi(id);

        const event = events.find((e) => e.id === id);
        if (
          event &&
          user.email &&
          event.user?.email &&
          event.user.email !== user.email
        ) {
          try {
            await createNotification({
              userEmail: event.user.email,
              message: `${user.name} has RSVP'd to your event: ${event.title}`,
            });
          } catch (notificationError) {
            console.error("Failed to send notification:", notificationError);
          }
        }

        setEvents((prevEvents) =>
          prevEvents.map((event) => (event.id === id ? response.event : event))
        );
      } catch (err: unknown) {
        await handleAxiosError(err, "Failed to RSVP to event");
      }
    },
    [user, events]
  );

  const deleteEvent = useCallback(async (id: string) => {
    try {
      await deleteEventApi(id);
      clearAllEventCache(); // Clear cache after deletion

      setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
    } catch (err: unknown) {
      await handleAxiosError(err, "Failed to delete event");
    }
  }, []);

  const updateEvent = useCallback(async (id: string, data: UpdateEventDto) => {
    try {
      const response = await updateEventApi(id, data);
      clearAllEventCache(); // Clear cache after update

      // Update the event in the local state
      setEvents((prevEvents) =>
        prevEvents.map((event) => (event.id === id ? response.event : event))
      );

      return response.event;
    } catch (err: unknown) {
      await handleAxiosError(err, "Failed to update event");
      throw err;
    }
  }, []);

  return (
    <EventsContext.Provider
      value={{
        events,
        loading,
        fetchEvents,
        rsvpEvent,
        deleteEvent,
        updateEvent,
      }}
    >
      {children}
    </EventsContext.Provider>
  );
};
