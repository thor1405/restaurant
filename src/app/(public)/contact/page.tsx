"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <div className="pt-32 pb-24 bg-[#111111] min-h-screen">
      <div className="container mx-auto px-6">
        <SectionHeading 
          title="Contact Us" 
          subtitle="Get in Touch" 
        />

        <div className="max-w-3xl mx-auto mt-16 grid grid-cols-1 gap-16">
          
          {/* Contact Information & Map */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-12"
          >
            <div>
              <h3 className="font-heading text-3xl text-white mb-8">Location & Hours</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4 text-white/70">
                  <MapPin className="text-(--color-accent) shrink-0 mt-1" size={24} />
                  <div>
                    <p className="font-medium text-white text-lg mb-1">Address</p>
                    <p className="font-light">123 Luxury Avenue<br />Paris, 75008, France</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 text-white/70">
                  <Clock className="text-(--color-accent) shrink-0 mt-1" size={24} />
                  <div>
                    <p className="font-medium text-white text-lg mb-1">Opening Hours</p>
                    <p className="font-light">Mon-Sun: 6:00 PM - 11:30 PM<br />(Last seating at 9:30 PM)</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 text-white/70">
                  <Phone className="text-(--color-accent) shrink-0 mt-1" size={24} />
                  <div>
                    <p className="font-medium text-white text-lg mb-1">Phone</p>
                    <a href="tel:+33123456789" className="font-light hover:text-(--color-accent) transition-colors">+33 1 23 45 67 89</a>
                  </div>
                </div>
                <div className="flex items-start gap-4 text-white/70">
                  <Mail className="text-(--color-accent) shrink-0 mt-1" size={24} />
                  <div>
                    <p className="font-medium text-white text-lg mb-1">Email</p>
                    <a href="mailto:contact@letoile.com" className="font-light hover:text-(--color-accent) transition-colors">contact@letoile.com</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="w-full h-[300px] bg-[#1C1C1C] rounded-lg overflow-hidden relative group">
              <div className="absolute inset-0 flex items-center justify-center bg-[#252525]">
                 {/* Simulate a map with an abstract background or icon */}
                 <div className="text-center text-white/40 flex flex-col items-center">
                    <MapPin size={48} className="mb-4 opacity-50" />
                    <p className="tracking-widest uppercase text-sm font-medium">Interactive Map view</p>
                 </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
