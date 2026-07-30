"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
type EventItem = {
  _id: string;
  title: string;
  date: string;
  description: string;
  image: string;
};

export default function EventsPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/events?activeOnly=true")
      .then(res => res.json())
      .then(data => {
        if (data.success) setEvents(data.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);
  return (
    <div className="pt-32 pb-24 bg-(--color-secondary) min-h-screen">
      <div className="container mx-auto px-6">
        <SectionHeading 
          title="Exclusive Events" 
          subtitle="Curated Experiences" 
        />

        {/* Upcoming Events List */}
        <div className="max-w-6xl mx-auto mt-16 space-y-16 lg:space-y-24 mb-32">
          {loading ? (
            <div className="text-black text-center py-20">Loading experiences...</div>
          ) : events.length === 0 ? (
            <div className="text-black/50 text-center py-20">No active experiences at the moment. Please check back later.</div>
          ) : (
            events.map((event, index) => (
              <motion.div 
                key={event._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className={`flex flex-col lg:flex-row gap-12 items-center ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
              >
                <div className="w-full lg:w-1/2 h-[400px] relative rounded-lg overflow-hidden group">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                </div>
                <div className="w-full lg:w-1/2 flex flex-col justify-center">
                  <span className="text-(--color-accent) font-medium tracking-widest text-sm uppercase mb-4">
                    {event.date}
                  </span>
                  <h3 className="font-heading text-3xl md:text-4xl text-black mb-6">
                    {event.title}
                  </h3>
                  <p className="text-black/70 font-light leading-relaxed mb-8 text-lg">
                    {event.description}
                  </p>
                  <div>
                    <Link href="/contact">
                      <Button variant="outline">Inquire Now</Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}
