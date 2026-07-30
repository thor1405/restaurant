"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";

export default function AboutPage() {
  return (
    <div className="pt-32 pb-24 bg-(--color-secondary) min-h-screen">
      <div className="container mx-auto px-6">
        <SectionHeading 
          title="Our Story" 
          subtitle="A Legacy of Excellence" 
        />

        {/* Introduction */}
        <div className="max-w-4xl mx-auto text-center mb-24">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-black/70 font-light leading-relaxed text-lg md:text-xl"
          >
            Founded in 1998, L&apos;Étoile Pâtisserie was born from a singular vision: to create a bakery experience that transcends the ordinary. We believe that true luxury lies not just in the ingredients, but in the harmony of flavor, ambiance, and impeccable service.
          </motion.p>
        </div>

        {/* Philosophy Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-32">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative h-[600px] rounded-lg overflow-hidden"
          >
            <Image
              src="https://images.unsplash.com/photo-1555507036-ab1f4022115c?auto=format&fit=crop&q=80&w=1000"
              alt="Artisanal Pastries"
              fill
              className="object-cover"
            />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="font-heading text-3xl md:text-4xl text-black mb-6">The Philosophy</h3>
            <div className="h-[1px] w-16 bg-(--color-accent) mb-8" />
            <p className="text-black/70 font-light leading-relaxed mb-6 text-lg">
              Our baking philosophy is deeply rooted in respect for nature&apos;s bounty. We source only the finest, seasonal ingredients from sustainable purveyors, allowing their natural flavors to dictate our creations.
            </p>
            <p className="text-black/70 font-light leading-relaxed text-lg">
              Every pastry and loaf is a meticulous composition, a balance of texture, temperature, and taste designed to evoke emotion and create lasting memories.
            </p>
          </motion.div>
        </div>

        {/* The Ambiance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center flex-col-reverse lg:flex-row-reverse">
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative h-[600px] rounded-lg overflow-hidden"
          >
            <Image
              src="https://images.unsplash.com/photo-1495147466023-ac5c588e2e94?auto=format&fit=crop&q=80&w=1000"
              alt="Bakery Interior"
              fill
              className="object-cover"
            />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="font-heading text-3xl md:text-4xl text-black mb-6">The Ambiance</h3>
            <div className="h-[1px] w-16 bg-(--color-accent) mb-8" />
            <p className="text-black/70 font-light leading-relaxed mb-6 text-lg">
              Designed by award-winning architects, our pâtisserie lounge reflects the elegance of our creations. The juxtaposition of light cream, warm gold, and intimate lighting creates a sanctuary from the bustling city outside.
            </p>
            <p className="text-black/70 font-light leading-relaxed text-lg">
              Whether you are seated in the main lounge or our exclusive private tasting room, the atmosphere is carefully curated to ensure your experience is nothing short of extraordinary.
            </p>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
