"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

const EVENTS = [
  {
    id: 1,
    title: "Viennoiserie Masterclass",
    date: "Every Thursday | 10:00 AM",
    description: "Join our head pastry chef for an exclusive journey through the art of lamination. Learn the secrets behind our perfect croissants.",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 2,
    title: "Afternoon Tea & Champagne",
    date: "Friday & Saturday | 3:00 PM",
    description: "Experience the soulful sounds of live jazz while enjoying our curated selection of delicate petit fours, scones, and vintage Champagnes.",
    image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 3,
    title: "Artisanal Bread Workshop",
    date: "November 15 - 30",
    description: "A celebration of sourdough and ancient grains. A hands-on workshop highlighting the earthy aroma of natural fermentation.",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800",
  }
];

export default function EventsPage() {
  return (
    <div className="pt-32 pb-24 bg-[#F5F5F5] min-h-screen">
      <div className="container mx-auto px-6">
        <SectionHeading 
          title="Exclusive Events" 
          subtitle="Curated Experiences" 
        />

        {/* Upcoming Events List */}
        <div className="max-w-6xl mx-auto mt-16 space-y-16 lg:space-y-24 mb-32">
          {EVENTS.map((event, index) => (
            <motion.div 
              key={event.id}
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
                  <Link href="/reservations">
                    <Button variant="outline">Book Experience</Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Private Dining Section */}
        <div className="max-w-6xl mx-auto border-t border-black/10 pt-24">
          <div className="bg-white rounded-lg p-8 md:p-16 flex flex-col items-center text-center">
            <h3 className="font-heading text-3xl md:text-5xl text-black mb-6">Private Dining</h3>
            <div className="h-[1px] w-24 bg-(--color-accent) mb-8" />
            <p className="text-black/70 font-light leading-relaxed mb-10 text-lg max-w-2xl">
              For intimate gatherings, corporate events, or special celebrations, our exclusive private dining room offers a secluded sanctuary. Accommodating up to 20 guests, enjoy customized menus and a dedicated sommelier for an unforgettable evening.
            </p>
            <Link href="/contact">
              <Button variant="primary" size="lg">Inquire Now</Button>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
