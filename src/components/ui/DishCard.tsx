"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export interface Dish {
  id: string;
  name: string;
  description: string;
  image: string;
  category?: string;
}

interface DishCardProps {
  dish: Dish;
  index?: number;
}

export default function DishCard({ dish, index = 0 }: DishCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative flex flex-col sm:flex-row gap-6 items-center sm:items-start p-4 hover:bg-white/5 transition-colors duration-300 rounded-lg"
    >
      <div className="relative w-full sm:w-32 h-48 sm:h-32 rounded-lg overflow-hidden shrink-0">
        <Image
          src={dish.image}
          alt={dish.name}
          fill
          className="object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
      </div>
      <div className="flex-grow flex flex-col justify-center h-full text-center sm:text-left">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-2">
          <h3 className="font-heading text-xl text-white tracking-wide">{dish.name}</h3>
        </div>
        <p className="text-white/60 font-light leading-relaxed text-sm max-w-xl">
          {dish.description}
        </p>
      </div>
    </motion.div>
  );
}
