"use client";

import { motion } from "framer-motion";
import React from "react";

interface EventSearchFilterProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  categories: string[];
  loading: boolean;
}

const EventSearchFilter: React.FC<EventSearchFilterProps> = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  categories,
  loading,
}) => {
  return (
    <motion.div
      className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl shadow-xl p-6 mb-10 border border-indigo-100 relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <div className="absolute top-2 right-2 w-8 h-8 opacity-20">
        <motion.div
          animate={{ rotate: [0, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full text-indigo-400"
          >
            <path
              d="M12 3V21M3 12H21"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
            />
          </svg>
        </motion.div>
      </div>

      <div className="absolute bottom-2 left-2 w-6 h-6 opacity-20">
        <div className="bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full w-full h-full" />
      </div>

      <div className="flex flex-col md:flex-row md:space-x-6 space-y-4 md:space-y-0 relative z-10">
        <div className="flex-1">
          <label className="block text-gray-700 font-medium mb-2">
            Search Events
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Search by title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border-2 border-indigo-200 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-100 shadow-sm transition-all duration-300"
              disabled={loading}
            />
            <svg
              className="absolute right-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-indigo-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        <div className="w-full md:w-64">
          <label className="block text-gray-700 font-medium mb-2">
            Filter by Category
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full border-2 border-indigo-200 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-100 shadow-sm transition-all duration-300 appearance-none bg-white"
            disabled={loading}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat} className="py-2">
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>
    </motion.div>
  );
};

export default EventSearchFilter;
