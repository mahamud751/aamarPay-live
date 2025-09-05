"use client";

import { motion } from "framer-motion";
import React from "react";
import { Event } from "@/services/types/Types";
import EventCard from "@/components/molecules/EventCard";

interface MyEventsListProps {
  events: Event[];
  onEdit: (event: Event) => void;
}

const MyEventsList: React.FC<MyEventsListProps> = ({ events, onEdit }) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {events.map((event, index) => (
        <motion.div
          key={event.id}
          variants={item}
          whileHover={{
            y: -10,
            scale: 1.03,
            transition: { duration: 0.3 },
          }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl border border-indigo-50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <div className="p-6">
            <EventCard event={event} showDelete />
          </div>
          <div className="px-6 pb-6">
            <motion.button
              onClick={() => onEdit(event)}
              className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold py-3 px-4 rounded-xl hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Edit Event
            </motion.button>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default MyEventsList;
