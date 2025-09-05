"use client";

import { useState, useEffect, useCallback, useMemo } from "react";

import { Event } from "@/services/types/Types";
import EditEventModal from "@/components/pageComponents/EditEventModal";
import { useEvents } from "@/contexts/EventsProviders";
import FloatingElement from "@/components/atoms/FloatingElement";
import DecorativeRing from "@/components/atoms/DecorativeRing";
import MyEventsHeader from "@/components/molecules/MyEventsHeader";
import NoEventsMessage from "@/components/molecules/NoEventsMessage";
import MyEventsList from "@/components/organisms/MyEventsList";
import LoadingEvents from "@/components/molecules/LoadingEvents";

export default function MyEvents() {
  const { events, loading, fetchEvents } = useEvents();
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);

  const fetchUserEvents = useCallback(() => {
    fetchEvents(true);
  }, [fetchEvents]);

  useEffect(() => {
    fetchUserEvents();
  }, [fetchUserEvents]);

  const userEvents = useMemo(() => {
    return events.filter((e) => e.isUserCreated);
  }, [events]);

  return (
    <div className="max-w-7xl mx-auto p-6 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <FloatingElement delay={0} duration={8} size="w-24 h-24" type="heart" />
        <FloatingElement delay={2} duration={12} size="w-16 h-16" type="star" />
        <FloatingElement
          delay={4}
          duration={10}
          size="w-20 h-20"
          type="diamond"
        />
        <FloatingElement delay={1} duration={15} size="w-12 h-12" />
        <FloatingElement
          delay={3}
          duration={11}
          size="w-28 h-28"
          type="heart"
        />
        <FloatingElement delay={5} duration={13} size="w-14 h-14" type="star" />
        <DecorativeRing delay={0} size="w-64 h-64" />
        <DecorativeRing delay={5} size="w-48 h-48" />
      </div>

      <MyEventsHeader eventCount={userEvents?.length || 0} />

      {loading && userEvents.length === 0 ? (
        <LoadingEvents />
      ) : userEvents?.length === 0 ? (
        <NoEventsMessage />
      ) : (
        <MyEventsList events={userEvents} onEdit={setEditingEvent} />
      )}

      {editingEvent && (
        <EditEventModal
          event={editingEvent}
          onClose={() => setEditingEvent(null)}
        />
      )}
    </div>
  );
}
