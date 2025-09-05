"use client";

import { motion } from "framer-motion";
import React from "react";

interface HomeHeaderProps {
  eventCount: number;
}

const HomeHeader: React.FC<HomeHeaderProps> = ({ eventCount }) => {
  return (
    <motion.div
      className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 rounded-3xl p-8 mb-10 text-white shadow-2xl relative overflow-hidden"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.3 },
      }}
    >
      <div className="absolute top-4 right-4 w-16 h-16 opacity-30">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
          >
            <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="1" />
            <path
              d="M8 12H16M12 8V16"
              stroke="white"
              strokeWidth="1"
              strokeLinecap="round"
            />
          </svg>
        </motion.div>
      </div>

      <div className="absolute bottom-4 left-4 w-12 h-12 opacity-30">
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
          >
            <circle cx="12" cy="12" r="8" stroke="white" strokeWidth="1" />
            <circle cx="12" cy="12" r="4" fill="white" />
          </svg>
        </motion.div>
      </div>

      <div className="absolute top-1/2 left-1/4 w-8 h-8 opacity-40">
        <motion.div
          animate={{ rotate: [0, 15, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <svg viewBox="0 0 24 24" fill="white" className="w-full h-full">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </motion.div>
      </div>

      <div className="absolute top-1/3 right-1/4 w-6 h-6 opacity-40">
        <motion.div
          animate={{ rotate: [0, -15, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <svg viewBox="0 0 24 24" fill="white" className="w-full h-full">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </motion.div>
      </div>

      <motion.h1
        className="text-5xl font-bold mb-4 text-center relative z-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
      >
        Discover Amazing Events
      </motion.h1>
      <motion.p
        className="text-2xl opacity-90 text-center mb-6 relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        Join our community and explore exciting experiences
      </motion.p>
      <motion.div
        className="mt-6 flex justify-center items-center relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <span className="bg-white bg-opacity-20 backdrop-blur-sm px-4 py-2 rounded-full text-lg font-medium">
          {eventCount} Events Available
        </span>
      </motion.div>
    </motion.div>
  );
};

export default HomeHeader;
