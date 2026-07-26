"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

export default function ReservationsPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <div className="pt-32 pb-24 bg-[#111111] min-h-screen">
      <div className="container mx-auto px-6">
        <SectionHeading 
          title="Reservations" 
          subtitle="Book Your Experience" 
        />

        <div className="max-w-3xl mx-auto mt-16 bg-[#1C1C1C] rounded-lg p-8 md:p-12">
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form 
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                onSubmit={handleSubmit}
                className="space-y-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-white/70 text-sm tracking-widest uppercase mb-2">Full Name</label>
                    <input 
                      type="text" 
                      id="name"
                      required
                      className="w-full bg-transparent border-b border-white/20 pb-3 text-white focus:outline-none focus:border-(--color-accent) transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-white/70 text-sm tracking-widest uppercase mb-2">Email Address</label>
                    <input 
                      type="email" 
                      id="email"
                      required
                      className="w-full bg-transparent border-b border-white/20 pb-3 text-white focus:outline-none focus:border-(--color-accent) transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>
                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="block text-white/70 text-sm tracking-widest uppercase mb-2">Phone Number</label>
                    <input 
                      type="tel" 
                      id="phone"
                      required
                      className="w-full bg-transparent border-b border-white/20 pb-3 text-white focus:outline-none focus:border-(--color-accent) transition-colors"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                  {/* Guests */}
                  <div>
                    <label htmlFor="guests" className="block text-white/70 text-sm tracking-widest uppercase mb-2">Number of Guests</label>
                    <select 
                      id="guests"
                      required
                      className="w-full bg-[#1C1C1C] border-b border-white/20 pb-3 text-white focus:outline-none focus:border-(--color-accent) transition-colors appearance-none"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                        <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                      ))}
                      <option value="9+">9+ Guests</option>
                    </select>
                  </div>
                  {/* Date */}
                  <div>
                    <label htmlFor="date" className="block text-white/70 text-sm tracking-widest uppercase mb-2">Date</label>
                    <input 
                      type="date" 
                      id="date"
                      required
                      className="w-full bg-transparent border-b border-white/20 pb-3 text-white focus:outline-none focus:border-(--color-accent) transition-colors"
                    />
                  </div>
                  {/* Time */}
                  <div>
                    <label htmlFor="time" className="block text-white/70 text-sm tracking-widest uppercase mb-2">Time</label>
                    <select 
                      id="time"
                      required
                      className="w-full bg-[#1C1C1C] border-b border-white/20 pb-3 text-white focus:outline-none focus:border-(--color-accent) transition-colors appearance-none"
                    >
                      <option value="">Select Time</option>
                      <option value="18:00">6:00 PM</option>
                      <option value="18:30">6:30 PM</option>
                      <option value="19:00">7:00 PM</option>
                      <option value="19:30">7:30 PM</option>
                      <option value="20:00">8:00 PM</option>
                      <option value="20:30">8:30 PM</option>
                      <option value="21:00">9:00 PM</option>
                    </select>
                  </div>
                </div>

                {/* Occasion */}
                <div>
                  <label htmlFor="occasion" className="block text-white/70 text-sm tracking-widest uppercase mb-2">Occasion (Optional)</label>
                  <select 
                    id="occasion"
                    className="w-full bg-[#1C1C1C] border-b border-white/20 pb-3 text-white focus:outline-none focus:border-(--color-accent) transition-colors appearance-none"
                  >
                    <option value="none">None</option>
                    <option value="birthday">Birthday</option>
                    <option value="anniversary">Anniversary</option>
                    <option value="business">Business Dinner</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Special Requests */}
                <div>
                  <label htmlFor="requests" className="block text-white/70 text-sm tracking-widest uppercase mb-2">Special Requests / Allergies</label>
                  <textarea 
                    id="requests"
                    rows={4}
                    className="w-full bg-transparent border-b border-white/20 pb-3 text-white focus:outline-none focus:border-(--color-accent) transition-colors resize-none"
                    placeholder="Please let us know of any dietary restrictions..."
                  ></textarea>
                </div>

                <div className="pt-6 text-center">
                  <Button 
                    type="submit" 
                    variant="primary" 
                    size="lg" 
                    className="w-full md:w-auto min-w-[200px]"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Processing..." : "Confirm Reservation"}
                  </Button>
                </div>
              </motion.form>
            ) : (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center py-16"
              >
                <div className="w-20 h-20 bg-(--color-accent)/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-(--color-accent)" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-heading text-3xl text-white mb-4">Reservation Confirmed</h3>
                <p className="text-white/70 font-light leading-relaxed mb-8 text-lg">
                  Thank you for choosing L&apos;Étoile. We have sent a confirmation email with your reservation details. We look forward to welcoming you.
                </p>
                <Button variant="outline" onClick={() => setIsSubmitted(false)}>
                  Make Another Booking
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
