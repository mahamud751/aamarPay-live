"use client";

import { motion } from "framer-motion";
import React from "react";
import { Event } from "@/services/types/Types";
import EventCard from "@/components/molecules/EventCard";

interface EventGridProps {
  events: Event[];
}

const EventGrid: React.FC<EventGridProps> = ({ events }) => {
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
            <EventCard event={event} />
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default EventGrid;
