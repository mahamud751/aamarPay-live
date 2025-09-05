"use client";

import { motion } from "framer-motion";
import React from "react";

interface FloatingElementProps {
  delay?: number;
  duration?: number;
  size?: string;
  type?: "circle" | "heart" | "star" | "diamond";
}

const FloatingElement: React.FC<FloatingElementProps> = ({
  delay = 0,
  duration = 10,
  size = "w-16 h-16",
  type = "circle",
}) => {
  const renderShape = () => {
    switch (type) {
      case "heart":
        return (
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-full h-full"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        );
      case "star":
        return (
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-full h-full"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        );
      case "diamond":
        return (
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-full h-full"
          >
            <path d="M12 2L2 9l4 12h12l4-12L12 2zm0 2.53L18.34 9 15 19l-6 0-3.34-10L12 4.53z" />
          </svg>
        );
      default:
        return (
          <div className="bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full w-full h-full blur-sm" />
        );
    }
  };

  return (
    <motion.div
      className={`absolute ${size} opacity-10`}
      animate={{
        y: [0, -20, 0],
        x: [0, 10, 0],
        rotate: [0, 10, 0],
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        delay: delay,
        ease: "easeInOut",
      }}
    >
      {renderShape()}
    </motion.div>
  );
};

export default FloatingElement;
