"use client";
import { useEffect, useState, useCallback, useMemo } from "react";

import DecorativeRing from "@/components/atoms/DecorativeRing";
import FloatingElement from "@/components/atoms/FloatingElement";
import EventSearchFilter from "@/components/molecules/EventSearchFilter";
import HomeHeader from "@/components/molecules/HomeHeader";
import HomePageLoading from "@/components/molecules/HomePageLoading";
import NoEventsFound from "@/components/molecules/NoEventsFound";
import EventGrid from "@/components/organisms/EventGrid";
import { useEvents } from "@/contexts/EventsProviders";
import { Category } from "@/services/types/Types";

export default function Home() {
  const { events, loading, fetchEvents } = useEvents();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = useMemo(() => ["All", ...Object.values(Category)], []);

  const fetchAllEvents = useCallback(() => {
    fetchEvents(false);
  }, [fetchEvents]);

  useEffect(() => {
    fetchAllEvents();
  }, [fetchAllEvents]);

  const filteredEvents = useMemo(() => {
    return events?.filter((event) => {
      const matchesSearch = event.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || event.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [events, searchTerm, selectedCategory]);

  return (
    <div className="max-w-7xl mx-auto p-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <FloatingElement delay={0} duration={8} size="w-24 h-24" type="heart" />
        <FloatingElement delay={2} duration={12} size="w-16 h-16" type="star" />
        <FloatingElement
          delay={4}
          duration={10}
          size="w-20 h-20"
          type="diamond"
        />
        <FloatingElement delay={1} duration={15} size="w-12 h-12" />
        <FloatingElement
          delay={3}
          duration={11}
          size="w-28 h-28"
          type="heart"
        />
        <FloatingElement delay={5} duration={13} size="w-14 h-14" type="star" />
        <DecorativeRing delay={0} size="w-64 h-64" />
        <DecorativeRing delay={5} size="w-48 h-48" />
      </div>

      <HomeHeader eventCount={events?.length || 0} />
      <EventSearchFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
        loading={loading}
      />

      {loading && events.length === 0 ? (
        <HomePageLoading />
      ) : filteredEvents?.length === 0 ? (
        <NoEventsFound />
      ) : (
        <EventGrid events={filteredEvents} />
      )}
    </div>
  );
}
