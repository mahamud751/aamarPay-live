"use client";
import React from "react";
import { motion } from "framer-motion";

interface LoaderProps {
  size?: "sm" | "md" | "lg";
  color?: "primary" | "secondary" | "white";
  fullScreen?: boolean;
  message?: string;
}

const Loader: React.FC<LoaderProps> = ({
  size = "md",
  color = "primary",
  fullScreen = false,
  message,
}) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };

  const colorClasses = {
    primary: "border-indigo-500 border-t-transparent",
    secondary: "border-purple-500 border-t-transparent",
    white: "border-white border-t-transparent",
  };

  const containerClasses = fullScreen
    ? "fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-30 z-50"
    : "flex flex-col items-center justify-center min-h-[200px]";

  return (
    <div className={containerClasses}>
      <motion.div
        className="relative"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className={`${sizeClasses[size]} ${colorClasses[color]} rounded-full border-4 absolute`}
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        <motion.div
          className={`${sizeClasses[size]} ${colorClasses[color]} rounded-full border-4 border-opacity-30`}
          animate={{ rotate: -360 }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        <motion.div
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${
            size === "sm" ? "w-2 h-2" : size === "md" ? "w-3 h-3" : "w-4 h-4"
          } ${color === "white" ? "bg-white" : "bg-indigo-500"} rounded-full`}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.7, 0.3, 0.7],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {message && (
        <motion.p
          className={`mt-6 text-center font-medium ${
            color === "white" ? "text-white" : "text-gray-700"
          }`}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          {message}
        </motion.p>
      )}
    </div>
  );
};

export default Loader;
