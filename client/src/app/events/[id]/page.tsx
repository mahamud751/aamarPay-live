"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

import { Event } from "@/services/types/Types";
import { useAuth } from "@/contexts/hooks/auth";
import { getEvent, rsvpEvent } from "@/services/apis/eventsOptimized";
import EditEventModal from "@/components/pageComponents/EditEventModal";
import FloatingElement from "@/components/atoms/FloatingElement";
import DecorativeRing from "@/components/atoms/DecorativeRing";
import EventHeader from "@/components/molecules/EventHeader";
import EventDetailsCard from "@/components/organisms/EventDetailsCard";
import EventNotFound from "@/components/molecules/EventNotFound";
import LoadingEvent from "@/components/molecules/LoadingEvent";

const MySwal = withReactContent(Swal);

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const { user } = useAuth();
  const router = useRouter();
  const retryCount = useRef(0);
  const MAX_RETRIES = 3;

  const fetchEvent = useCallback(
    async (retryAttempt = 0) => {
      if (id && typeof id === "string") {
        setLoading(true);
        try {
          const response = await getEvent(id);
          setEvent(response as unknown as Event | null);
          retryCount.current = 0;
        } catch (err: unknown) {
          const error = err as Error & {
            response?: { data?: { message?: string } };
          };

          if (retryAttempt < MAX_RETRIES && !error.response) {
            retryCount.current = retryAttempt + 1;

            const delay = Math.pow(2, retryAttempt) * 1000;
            await new Promise((resolve) => setTimeout(resolve, delay));
            return fetchEvent(retryAttempt + 1);
          }

          MySwal.fire({
            icon: "error",
            title: "Error",
            text: error.response?.data?.message || "Failed to fetch event",
          });
        } finally {
          setLoading(false);
        }
      }
    },
    [id]
  );

  useEffect(() => {
    fetchEvent();
  }, [fetchEvent]);

  const handleRsvp = async () => {
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
        reverseButtons: true,
        customClass: {
          confirmButton: "px-6 py-3 text-white rounded-lg font-medium",
          cancelButton: "px-6 py-3 text-white rounded-lg font-medium",
          title: "text-xl font-bold",
          popup: "rounded-xl shadow-lg",
        },
      });

      if (result.isConfirmed) {
        router.push("/login");
      }
      return;
    }

    if (id && typeof id === "string") {
      setLoading(true);
      try {
        const response = await rsvpEvent(id);
        setEvent(response.event);
        MySwal.fire({
          icon: "success",
          title: "Success",
          text: "RSVP recorded successfully",
        });
      } catch (err: unknown) {
        const error = err as Error & {
          response?: { data?: { message?: string } };
        };
        MySwal.fire({
          icon: "error",
          title: "Error",
          text: error.response?.data?.message || "Failed to RSVP",
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Conference: "bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800",
      Workshop: "bg-gradient-to-r from-green-100 to-green-200 text-green-800",
      Social: "bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800",
      Other: "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800",
    };
    return (
      colors[category] ||
      "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800"
    );
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <FloatingElement
            delay={0}
            duration={8}
            size="w-32 h-32"
            type="heart"
          />
          <FloatingElement
            delay={2}
            duration={12}
            size="w-24 h-24"
            type="star"
          />
          <FloatingElement
            delay={4}
            duration={10}
            size="w-28 h-28"
            type="diamond"
          />
          <FloatingElement delay={1} duration={15} size="w-20 h-20" />
          <FloatingElement
            delay={3}
            duration={11}
            size="w-36 h-36"
            type="heart"
          />
          <FloatingElement
            delay={5}
            duration={13}
            size="w-22 h-22"
            type="star"
          />
          <DecorativeRing delay={0} size="w-96 h-96" />
          <DecorativeRing delay={7} size="w-72 h-72" />
        </div>
        <LoadingEvent />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="max-w-4xl mx-auto p-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <FloatingElement
            delay={0}
            duration={8}
            size="w-32 h-32"
            type="heart"
          />
          <FloatingElement
            delay={2}
            duration={12}
            size="w-24 h-24"
            type="star"
          />
          <FloatingElement
            delay={4}
            duration={10}
            size="w-28 h-28"
            type="diamond"
          />
          <FloatingElement delay={1} duration={15} size="w-20 h-20" />
          <FloatingElement
            delay={3}
            duration={11}
            size="w-36 h-36"
            type="heart"
          />
          <FloatingElement
            delay={5}
            duration={13}
            size="w-22 h-22"
            type="star"
          />
          <DecorativeRing delay={0} size="w-96 h-96" />
          <DecorativeRing delay={7} size="w-72 h-72" />
        </div>
        <EventNotFound />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <FloatingElement delay={0} duration={8} size="w-32 h-32" type="heart" />
        <FloatingElement delay={2} duration={12} size="w-24 h-24" type="star" />
        <FloatingElement
          delay={4}
          duration={10}
          size="w-28 h-28"
          type="diamond"
        />
        <FloatingElement delay={1} duration={15} size="w-20 h-20" />
        <FloatingElement
          delay={3}
          duration={11}
          size="w-36 h-36"
          type="heart"
        />
        <FloatingElement delay={5} duration={13} size="w-22 h-22" type="star" />
        <DecorativeRing delay={0} size="w-96 h-96" />
        <DecorativeRing delay={7} size="w-72 h-72" />
      </div>

      <EventHeader event={event} getCategoryColor={getCategoryColor} />
      <EventDetailsCard
        event={event}
        loading={loading}
        handleRsvp={handleRsvp}
        user={user}
        setEditingEvent={setEditingEvent}
      />

      {editingEvent && (
        <EditEventModal
          event={editingEvent}
          onClose={() => {
            setEditingEvent(null);
            fetchEvent();
          }}
        />
      )}
    </div>
  );
};

export default EventDetails;
