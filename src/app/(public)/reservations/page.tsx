"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

type Slot = {
  time: string;
  availableCapacity: number;
};

export default function ReservationsPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [guests, setGuests] = useState(2);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [occasion, setOccasion] = useState("");
  const [requests, setRequests] = useState("");

  const [availableSlots, setAvailableSlots] = useState<Slot[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);

  useEffect(() => {
    if (date) {
      setLoadingSlots(true);
      fetch(`/api/slots/available?date=${date}`)
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setAvailableSlots(data.data);
          }
          setLoadingSlots(false);
        })
        .catch(() => {
          setLoadingSlots(false);
        });
    } else {
      setAvailableSlots([]);
    }
  }, [date]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const payload = {
      name, email, phone, guests: Number(guests), date, time, occasion, requests
    };

    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setIsSubmitted(true);
      } else {
        alert("Failed to submit reservation. Please try again.");
      }
    } catch (error) {
      alert("An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Filter slots that have enough capacity for the requested guests
  const validSlots = availableSlots.filter(s => s.availableCapacity >= guests);

  return (
    <div className="pt-32 pb-24 bg-[#F5F5F5] min-h-screen">
      <div className="container mx-auto px-6">
        <SectionHeading 
          title="Reservations" 
          subtitle="Book Your Experience" 
        />

        <div className="max-w-3xl mx-auto mt-16 bg-white rounded-lg p-8 md:p-12">
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
                    <label htmlFor="name" className="block text-black/70 text-sm tracking-widest uppercase mb-2">Full Name</label>
                    <input 
                      type="text" id="name" required value={name} onChange={e => setName(e.target.value)}
                      className="w-full bg-transparent border-b border-black/20 pb-3 text-black focus:outline-none focus:border-(--color-accent) transition-colors"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-black/70 text-sm tracking-widest uppercase mb-2">Email Address</label>
                    <input 
                      type="email" id="email" required value={email} onChange={e => setEmail(e.target.value)}
                      className="w-full bg-transparent border-b border-black/20 pb-3 text-black focus:outline-none focus:border-(--color-accent) transition-colors"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="block text-black/70 text-sm tracking-widest uppercase mb-2">Phone Number</label>
                    <input 
                      type="tel" id="phone" required value={phone} onChange={e => setPhone(e.target.value)}
                      className="w-full bg-transparent border-b border-black/20 pb-3 text-black focus:outline-none focus:border-(--color-accent) transition-colors"
                    />
                  </div>

                  {/* Guests */}
                  <div>
                    <label htmlFor="guests" className="block text-black/70 text-sm tracking-widest uppercase mb-2">Number of Guests</label>
                    <select 
                      id="guests" required value={guests} onChange={e => setGuests(Number(e.target.value))}
                      className="w-full bg-white border-b border-black/20 pb-3 text-black focus:outline-none focus:border-(--color-accent) transition-colors appearance-none"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                        <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                      ))}
                    </select>
                  </div>

                  {/* Date */}
                  <div>
                    <label htmlFor="date" className="block text-black/70 text-sm tracking-widest uppercase mb-2">Date</label>
                    <input 
                      type="date" id="date" required value={date} onChange={e => setDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full bg-transparent border-b border-black/20 pb-3 text-black focus:outline-none focus:border-(--color-accent) transition-colors"
                      style={{ colorScheme: "dark" }}
                    />
                  </div>

                  {/* Time */}
                  <div>
                    <label htmlFor="time" className="block text-black/70 text-sm tracking-widest uppercase mb-2">Time</label>
                    <select 
                      id="time" required value={time} onChange={e => setTime(e.target.value)} disabled={!date || loadingSlots}
                      className="w-full bg-white border-b border-black/20 pb-3 text-black focus:outline-none focus:border-(--color-accent) transition-colors appearance-none disabled:opacity-50"
                    >
                      <option value="" disabled>
                        {!date ? "Select a date first" : loadingSlots ? "Loading slots..." : validSlots.length === 0 ? "No slots available" : "Select time"}
                      </option>
                      {validSlots.map(slot => (
                        <option key={slot.time} value={slot.time}>{slot.time}</option>
                      ))}
                    </select>
                  </div>

                  {/* Occasion */}
                  <div>
                    <label htmlFor="occasion" className="block text-black/70 text-sm tracking-widest uppercase mb-2">Special Occasion (Optional)</label>
                    <select 
                      id="occasion" value={occasion} onChange={e => setOccasion(e.target.value)}
                      className="w-full bg-white border-b border-black/20 pb-3 text-black focus:outline-none focus:border-(--color-accent) transition-colors appearance-none"
                    >
                      <option value="">None</option>
                      <option value="Birthday">Birthday</option>
                      <option value="Anniversary">Anniversary</option>
                      <option value="Business">Business Meal</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                {/* Special Requests */}
                <div>
                  <label htmlFor="requests" className="block text-black/70 text-sm tracking-widest uppercase mb-2">Special Requests (Optional)</label>
                  <textarea 
                    id="requests" rows={3} value={requests} onChange={e => setRequests(e.target.value)}
                    className="w-full bg-transparent border-b border-black/20 pb-3 text-black focus:outline-none focus:border-(--color-accent) transition-colors resize-none"
                    placeholder="Dietary requirements, seating preferences..."
                  ></textarea>
                </div>

                <div className="pt-6">
                  <Button type="submit" variant="primary" className="w-full md:w-auto" disabled={isSubmitting || !date || validSlots.length === 0}>
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
                className="text-center py-12"
              >
                <div className="w-20 h-20 bg-(--color-accent)/20 rounded-full flex items-center justify-center mx-auto mb-8">
                  <svg className="w-10 h-10 text-(--color-accent)" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-heading text-3xl text-black mb-4">Reservation Requested</h3>
                <p className="text-black/70 max-w-md mx-auto mb-8 leading-relaxed">
                  Thank you, {name}. Your reservation request for {guests} guests on {new Date(date).toLocaleDateString()} at {time} has been received. Our team will contact you shortly to confirm.
                </p>
                <Button variant="outline" onClick={() => setIsSubmitted(false)}>
                  Make Another Reservation
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
