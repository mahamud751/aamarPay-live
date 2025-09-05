"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";

const NoEventsMessage: React.FC = () => {
  return (
    <motion.div
      className="text-center py-16 bg-gradient-to-br from-white to-indigo-50 rounded-2xl shadow-lg border border-indigo-100"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2 }}
    >
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
            d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </motion.div>
      <h3 className="text-3xl font-bold text-gray-800 mb-3">
        No Events Created Yet
      </h3>
      <p className="text-gray-600 text-lg max-w-md mx-auto mb-8">
        Get started by creating your first event and share it with the
        community.
      </p>
      <Link href="/create-event">
        <motion.button
          className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-3 px-8 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Create Your First Event
        </motion.button>
      </Link>
    </motion.div>
  );
};

export default NoEventsMessage;
