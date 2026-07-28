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
    <div className="pt-32 pb-24 bg-[#F5F5F5] min-h-screen">
      <div className="container mx-auto px-6">
        <SectionHeading 
          title="Contact Us" 
          subtitle="Get in Touch" 
        />

        <div className="max-w-6xl mx-auto mt-16 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Contact Information & Map */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-12"
          >
            <div>
              <h3 className="font-heading text-3xl text-black mb-8">Location & Hours</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4 text-black/70">
                  <MapPin className="text-(--color-accent) shrink-0 mt-1" size={24} />
                  <div>
                    <p className="font-medium text-black text-lg mb-1">Address</p>
                    <p className="font-light">123 Luxury Avenue<br />Paris, 75008, France</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 text-black/70">
                  <Clock className="text-(--color-accent) shrink-0 mt-1" size={24} />
                  <div>
                    <p className="font-medium text-black text-lg mb-1">Opening Hours</p>
                    <p className="font-light">Mon-Sun: 6:00 PM - 11:30 PM<br />(Last seating at 9:30 PM)</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 text-black/70">
                  <Phone className="text-(--color-accent) shrink-0 mt-1" size={24} />
                  <div>
                    <p className="font-medium text-black text-lg mb-1">Phone</p>
                    <a href="tel:+33123456789" className="font-light hover:text-(--color-accent) transition-colors">+33 1 23 45 67 89</a>
                  </div>
                </div>
                <div className="flex items-start gap-4 text-black/70">
                  <Mail className="text-(--color-accent) shrink-0 mt-1" size={24} />
                  <div>
                    <p className="font-medium text-black text-lg mb-1">Email</p>
                    <a href="mailto:contact@letoile.com" className="font-light hover:text-(--color-accent) transition-colors">contact@letoile.com</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="w-full h-[300px] bg-white rounded-lg overflow-hidden relative group">
              <div className="absolute inset-0 flex items-center justify-center bg-[#252525]">
                 {/* Simulate a map with an abstract background or icon */}
                 <div className="text-center text-black/40 flex flex-col items-center">
                    <MapPin size={48} className="mb-4 opacity-50" />
                    <p className="tracking-widest uppercase text-sm font-medium">Interactive Map view</p>
                 </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white rounded-lg p-8 md:p-12"
          >
            <h3 className="font-heading text-3xl text-black mb-8">Send a Message</h3>
            
            {isSubmitted ? (
               <div className="text-center py-12">
                  <div className="w-16 h-16 bg-(--color-accent)/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-(--color-accent)" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="font-heading text-2xl text-black mb-4">Message Sent</h4>
                  <p className="text-black/70 font-light mb-8">We have received your message and will get back to you shortly.</p>
                  <Button variant="outline" onClick={() => setIsSubmitted(false)}>Send Another Message</Button>
               </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <label htmlFor="contact-name" className="block text-black/70 text-sm tracking-widest uppercase mb-2">Full Name</label>
                  <input 
                    type="text" 
                    id="contact-name"
                    required
                    className="w-full bg-transparent border-b border-black/20 pb-3 text-black focus:outline-none focus:border-(--color-accent) transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-black/70 text-sm tracking-widest uppercase mb-2">Email Address</label>
                  <input 
                    type="email" 
                    id="contact-email"
                    required
                    className="w-full bg-transparent border-b border-black/20 pb-3 text-black focus:outline-none focus:border-(--color-accent) transition-colors"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="contact-subject" className="block text-black/70 text-sm tracking-widest uppercase mb-2">Subject</label>
                  <input 
                    type="text" 
                    id="contact-subject"
                    required
                    className="w-full bg-transparent border-b border-black/20 pb-3 text-black focus:outline-none focus:border-(--color-accent) transition-colors"
                    placeholder="How can we help?"
                  />
                </div>
                <div>
                  <label htmlFor="contact-message" className="block text-black/70 text-sm tracking-widest uppercase mb-2">Message</label>
                  <textarea 
                    id="contact-message"
                    required
                    rows={5}
                    className="w-full bg-transparent border-b border-black/20 pb-3 text-black focus:outline-none focus:border-(--color-accent) transition-colors resize-none"
                    placeholder="Your message here..."
                  ></textarea>
                </div>
                <div className="pt-4">
                  <Button 
                    type="submit" 
                    variant="primary" 
                    size="lg" 
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </div>
              </form>
            )}
          </motion.div>

        </div>
      </div>
    </div>
  );
}
