"use client";

import { motion } from "framer-motion";
import React from "react";
import { Event, User } from "@/services/types/Types";

interface EventDetailsCardProps {
  event: Event;
  loading: boolean;
  handleRsvp: () => void;
  user: User | null;
  setEditingEvent: (event: Event) => void;
}

const EventDetailsCard: React.FC<EventDetailsCardProps> = ({
  event,
  loading,
  handleRsvp,
  user,
  setEditingEvent,
}) => {
  return (
    <motion.div
      className="bg-gradient-to-br from-white to-indigo-50 rounded-3xl shadow-2xl p-8 border border-indigo-100 relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <div className="absolute top-4 right-4 w-10 h-10 opacity-10">
        <motion.div
          animate={{ rotate: [0, 15, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full text-indigo-400"
          >
            <path
              d="M12 3V21M3 12H21"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
            />
          </svg>
        </motion.div>
      </div>

      <div className="absolute bottom-4 left-4 w-8 h-8 opacity-10">
        <div className="bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full w-full h-full" />
      </div>

      <div className="space-y-8 relative z-10">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-indigo-200 inline-block">
            Description
          </h2>
          <motion.p
            className="text-gray-700 text-lg leading-relaxed"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            {event.description}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h3 className="text-xl font-bold text-gray-800 mb-3">Location</h3>
            <p className="text-gray-700 bg-indigo-50 p-4 rounded-xl border border-indigo-100">
              {event.location}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h3 className="text-xl font-bold text-gray-800 mb-3">Date</h3>
            <p className="text-gray-700 bg-indigo-50 p-4 rounded-xl border border-indigo-100">
              {new Date(event.date).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </motion.div>

          {event.user && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
            >
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Created by
              </h3>
              <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-4 rounded-xl border border-indigo-100">
                <p className="text-gray-800 font-bold text-lg">
                  {event.user.name}
                </p>
              </div>
            </motion.div>
          )}

          <motion.div
            className="flex justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-2xl p-6 shadow-lg w-full max-w-sm relative overflow-hidden">
              <div className="absolute top-2 right-2 w-6 h-6 opacity-30">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="white"
                    className="w-full h-full"
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </motion.div>
              </div>

              <div className="absolute bottom-2 left-2 w-4 h-4 opacity-30">
                <motion.div
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="white"
                    className="w-full h-full"
                  >
                    <circle cx="12" cy="12" r="8" />
                  </svg>
                </motion.div>
              </div>

              <div className="text-center relative z-10">
                <div className="flex justify-center mb-2">
                  <svg
                    className="w-8 h-8 text-white mr-2"
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
                </div>
                <div className="text-4xl font-bold mb-2">{event.rsvpCount}</div>
                <div className="text-lg font-medium">People Attending</div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="pt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="flex flex-wrap gap-4">
            {user && event.userId === user.id && (
              <motion.button
                onClick={() => setEditingEvent(event)}
                className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold py-3 px-8 rounded-xl hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Edit Event
              </motion.button>
            )}

            <motion.button
              onClick={handleRsvp}
              disabled={loading}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-3 px-8 rounded-xl hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white mr-2"
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
                  Processing...
                </>
              ) : (
                "RSVP to Event"
              )}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default EventDetailsCard;
