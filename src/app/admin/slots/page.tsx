"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Plus, Trash2 } from "lucide-react";

type SlotConfig = {
  _id: string;
  time: string;
  maxGuests: number;
};

export default function SlotsManager() {
  const [slots, setSlots] = useState<SlotConfig[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [time, setTime] = useState("18:00");
  const [maxGuests, setMaxGuests] = useState(20);

  const fetchSlots = async () => {
    try {
      const res = await fetch("/api/slots");
      const data = await res.json();
      if (data.success) {
        setSlots(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch slots", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSlots();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/slots", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ time, maxGuests: Number(maxGuests) }),
      });
      if (res.ok) {
        fetchSlots();
        setTime("18:00");
        setMaxGuests(20);
      } else {
        alert("Failed to save slot. Time might be invalid.");
      }
    } catch (error) {
      alert("An error occurred");
    }
  };

  const handleDelete = async (timeToDelete: string) => {
    if (!confirm(`Are you sure you want to delete the slot at ${timeToDelete}?`)) return;
    
    try {
      const res = await fetch(`/api/slots?time=${encodeURIComponent(timeToDelete)}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchSlots();
      }
    } catch (error) {
      alert("Failed to delete slot");
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-heading text-3xl text-black">Slot Settings</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Form */}
        <div className="col-span-1">
          <div className="bg-white rounded-lg border border-black/10 p-6">
            <h2 className="text-xl text-black font-heading mb-6">Add / Update Slot</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-black/70 text-xs tracking-widest uppercase mb-2">Time (HH:MM)</label>
                <input 
                  type="time" 
                  required 
                  value={time} 
                  onChange={e => setTime(e.target.value)}
                  className="w-full bg-transparent border border-black/10 rounded p-3 text-black focus:outline-none focus:border-(--color-accent)"
                  style={{ colorScheme: "dark" }}
                />
              </div>
              <div>
                <label className="block text-black/70 text-xs tracking-widest uppercase mb-2">Max Guests Capacity</label>
                <input 
                  type="number" 
                  required 
                  min="1"
                  value={maxGuests} 
                  onChange={e => setMaxGuests(Number(e.target.value))}
                  className="w-full bg-transparent border border-black/10 rounded p-3 text-black focus:outline-none focus:border-(--color-accent)"
                />
              </div>
              <Button type="submit" variant="primary" className="w-full">
                <Plus size={18} className="mr-2" /> Save Slot
              </Button>
            </form>
          </div>
        </div>

        {/* List */}
        <div className="col-span-1 lg:col-span-2">
          <div className="bg-white rounded-lg border border-black/10 overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-transparent border-b border-black/10 text-black/50 text-xs tracking-widest uppercase">
                  <th className="p-4 font-medium">Time Slot</th>
                  <th className="p-4 font-medium">Max Guests</th>
                  <th className="p-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={3} className="p-4 text-black/50">Loading...</td></tr>
                ) : slots.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="p-8 text-center text-black/50">
                      No slots configured. Use the form to add available reservation times.
                    </td>
                  </tr>
                ) : (
                  slots.map((slot) => (
                    <tr key={slot._id} className="border-b border-black/5 hover:bg-black/5 transition-colors">
                      <td className="p-4">
                        <div className="text-(--color-accent) text-lg font-medium">{slot.time}</div>
                      </td>
                      <td className="p-4">
                        <div className="text-black">{slot.maxGuests} guests</div>
                      </td>
                      <td className="p-4 text-right">
                        <button 
                          onClick={() => handleDelete(slot.time)}
                          className="p-2 text-red-500/70 hover:text-red-500 transition-colors bg-red-500/10 rounded"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
