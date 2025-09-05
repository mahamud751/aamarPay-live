"use client";

import { motion } from "framer-motion";
import React from "react";

const NoEventsFound: React.FC = () => {
  return (
    <motion.div
      className="text-center py-16 bg-gradient-to-br from-white to-indigo-50 rounded-2xl shadow-lg border border-indigo-100 relative"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2 }}
    >
      <div className="absolute top-4 right-4 w-10 h-10 opacity-20">
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full text-indigo-400"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="1"
            />
          </svg>
        </motion.div>
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
      <h3 className="text-3xl font-bold text-gray-800 mb-3">No Events Found</h3>
      <p className="text-gray-600 text-lg max-w-md mx-auto">
        Try adjusting your search or filter criteria to find what you&apos;re
        looking for.
      </p>
    </motion.div>
  );
};

export default NoEventsFound;
