"use client";

import { motion } from "framer-motion";
import React from "react";

interface DecorativeRingProps {
  delay?: number;
  size?: string;
}

const DecorativeRing: React.FC<DecorativeRingProps> = ({
  delay = 0,
  size = "w-32 h-32",
}) => (
  <motion.div
    className={`absolute ${size} rounded-full border-2 border-indigo-300 opacity-20`}
    animate={{
      scale: [1, 1.2, 1],
      rotate: [0, 180, 360],
    }}
    transition={{
      duration: 20,
      repeat: Infinity,
      delay: delay,
      ease: "easeInOut",
    }}
  />
);

export default DecorativeRing;
