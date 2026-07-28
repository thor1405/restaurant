"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const REVIEWS = [
  {
    id: 1,
    name: "Eleanor R.",
    text: "An absolute triumph of baking. The artisanal sourdough took us on a journey that we will not soon forget. The service was impeccable.",
    rating: 5,
  },
  {
    id: 2,
    name: "James T.",
    text: "L'Étoile Pâtisserie sets a new standard for bakeries in the city. The croissants were baked to perfection and the coffee pairing was flawless.",
    rating: 5,
  },
  {
    id: 3,
    name: "Sophie M.",
    text: "Every pastry is a work of art. The atmosphere is luxurious yet welcoming. A truly magical morning from start to finish.",
    rating: 5,
  }
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-[#111111] relative border-t border-white/5">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-white mb-6">
            Words from Our Guests
          </h2>
          <div className="h-[1px] w-24 bg-(--color-accent) mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-[#1C1C1C] p-8 rounded-lg flex flex-col items-center text-center"
            >
              <div className="flex gap-1 text-(--color-accent) mb-6">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
              <p className="text-white/80 font-light italic leading-relaxed mb-6 flex-grow">
                "{review.text}"
              </p>
              <span className="text-white font-medium tracking-widest text-sm uppercase">
                - {review.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
