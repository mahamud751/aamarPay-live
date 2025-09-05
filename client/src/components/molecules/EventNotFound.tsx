"use client";

import { motion } from "framer-motion";
import React from "react";
import FloatingElement from "@/components/atoms/FloatingElement";

const EventNotFound: React.FC = () => {
  return (
    <motion.div
      className="max-w-4xl mx-auto p-6 text-center py-20 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <FloatingElement delay={1} duration={9} size="w-20 h-20" />
        <FloatingElement delay={3} duration={11} size="w-14 h-14" />
      </div>

      <motion.div
        className="bg-gradient-to-r from-indigo-100 to-purple-100 border-2 border-dashed border-indigo-300 rounded-2xl w-24 h-24 mx-auto mb-6 flex items-center justify-center"
        whileHover={{ rotate: 10, scale: 1.1 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <svg
          className="h-12 w-12 text-indigo-500"
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
      </motion.div>
      <h2 className="text-3xl font-bold text-gray-800 mb-3">Event not found</h2>
      <p className="text-gray-600 text-lg">
        The event you&#39;re looking for doesn&#39;t exist or has been removed.
      </p>
    </motion.div>
  );
};

export default EventNotFound;
