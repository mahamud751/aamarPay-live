"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { Event } from "@/services/types/Types";

interface EventCardProps {
  event: Event;
  onRsvp?: (eventId: string) => void;
  onDelete?: (eventId: string) => void;
  showDelete?: boolean;
}

export default function EventCard({
  event,
  onRsvp,
  onDelete,
  showDelete = false,
}: EventCardProps) {
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

  return (
    <motion.div
      className="border-none rounded-lg p-0 relative overflow-hidden bg-white shadow-lg hover:shadow-xl transition-shadow duration-300"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <div className="p-6">
        <h3 className="text-xl font-bold mb-3 line-clamp-1 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          {event.title}
        </h3>

        <div className="space-y-2 mb-4">
          <p className="text-gray-600">
            <span className="font-medium text-indigo-700">Date:</span>{" "}
            <span className="font-medium">
              {new Date(event.date).toLocaleDateString()}
            </span>
          </p>
          <p className="text-gray-600">
            <span className="font-medium text-indigo-700">Location:</span>{" "}
            {event.location}
          </p>

          {event.user && (
            <p className="text-gray-600 text-sm">
              <span className="font-medium text-indigo-700">Created by:</span>{" "}
              <span className="text-purple-600 font-medium">
                {event.user.name}
              </span>
            </p>
          )}
        </div>

        <div className="flex items-center justify-between mb-4">
          <span
            className={`text-xs font-bold px-3 py-1 rounded-full ${getCategoryColor(
              event.category
            )}`}
          >
            {event.category}
          </span>

          <div className="flex items-center bg-gradient-to-r from-indigo-50 to-purple-50 rounded-full px-3 py-1 border border-indigo-200">
            <svg
              className="w-4 h-4 text-indigo-600 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <span className="text-sm font-bold text-indigo-700">
              {event.rsvpCount} attending
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Link
            href={`/events/${event.id}`}
            className="flex-1 min-w-[100px] text-center bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white text-sm font-bold py-2 px-3 rounded-lg transition-all duration-300"
          >
            View
          </Link>

          {onRsvp && (
            <button
              onClick={() => onRsvp(event.id)}
              className="flex-1 min-w-[100px] bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white text-sm font-bold py-2 px-3 rounded-lg transition-all duration-300"
            >
              RSVP
            </button>
          )}

          {showDelete && onDelete && (
            <button
              onClick={() => onDelete(event.id)}
              className="flex-1 min-w-[100px] bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white text-sm font-bold py-2 px-3 rounded-lg transition-all duration-300"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
