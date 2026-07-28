"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function ChefSection() {
  return (
    <section className="py-24 bg-[#FAFAFA] relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 relative h-[500px] lg:h-[700px] rounded-t-full rounded-b-sm overflow-hidden"
          >
            <Image
              src="https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80&w=1000"
              alt="Executive Chef"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent" />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-1/2 text-center lg:text-left"
          >
            <p className="text-(--color-accent) uppercase tracking-[0.3em] text-sm font-medium mb-4">
              The Visionary
            </p>
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-black mb-8 leading-tight">
              Meet Head Pastry <br />
              Chef <span className="italic font-light">Antoine</span>
            </h2>
            <div className="h-[1px] w-24 bg-(--color-accent) mb-8 mx-auto lg:mx-0" />
            <p className="text-black/70 font-light leading-relaxed mb-6 text-lg">
              With over two decades of culinary mastery acquired in the world&apos;s most prestigious patisseries, Chef Antoine brings a unique philosophy to L&apos;Étoile Pâtisserie.
            </p>
            <p className="text-black/70 font-light leading-relaxed mb-10 text-lg">
              His approach blends classic French pastry techniques with avant-garde innovation, resulting in creations that respect tradition while daring to redefine the modern bakery experience.
            </p>
            <div className="font-heading text-3xl text-black/50 italic">
              "Antoine"
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
