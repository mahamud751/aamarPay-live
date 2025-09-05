"use client";

import { motion } from "framer-motion";
import React from "react";
import FloatingElement from "@/components/atoms/FloatingElement";

const LoadingEvent: React.FC = () => {
  return (
    <div className="flex justify-center items-center py-20 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <FloatingElement delay={0} duration={8} size="w-24 h-24" type="heart" />
        <FloatingElement delay={2} duration={12} size="w-16 h-16" type="star" />
        <FloatingElement
          delay={4}
          duration={10}
          size="w-20 h-20"
          type="diamond"
        />
      </div>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="h-20 w-20 border-4 border-indigo-500 border-t-transparent rounded-full relative z-10"
      />
    </div>
  );
};

export default LoadingEvent;
