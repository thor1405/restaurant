"use client";

import { useState, useEffect } from "react";
import { Check, X as XIcon, Clock } from "lucide-react";

type Reservation = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  guests: number;
  date: string;
  time: string;
  occasion?: string;
  requests?: string;
  status: 'pending' | 'approved' | 'cancelled';
  createdAt: string;
};

export default function ReservationsManager() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReservations = async () => {
    try {
      const res = await fetch("/api/reservations");
      const data = await res.json();
      if (data.success) {
        setReservations(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch reservations", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const updateStatus = async (id: string, status: 'approved' | 'cancelled') => {
    try {
      const res = await fetch(`/api/reservations/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        fetchReservations();
      }
    } catch (error) {
      alert("Failed to update status");
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'approved': return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'cancelled': return 'text-red-400 bg-red-400/10 border-red-400/20';
      default: return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-heading text-3xl text-black">Reservations</h1>
      </div>

      {loading ? (
        <div className="text-black">Loading reservations...</div>
      ) : (
        <div className="bg-white rounded-lg border border-black/10 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-transparent border-b border-black/10 text-black/50 text-xs tracking-widest uppercase">
                <th className="p-4 font-medium">Guest</th>
                <th className="p-4 font-medium">Date & Time</th>
                <th className="p-4 font-medium">Details</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((res) => (
                <tr key={res._id} className="border-b border-black/5 hover:bg-black/5 transition-colors">
                  <td className="p-4">
                    <div className="text-black font-medium">{res.name}</div>
                    <div className="text-black/50 text-sm">{res.email}</div>
                    <div className="text-black/50 text-sm">{res.phone}</div>
                  </td>
                  <td className="p-4">
                    <div className="text-black">{new Date(res.date).toLocaleDateString()}</div>
                    <div className="text-(--color-accent) font-medium">{res.time}</div>
                  </td>
                  <td className="p-4">
                    <div className="text-black/70 text-sm">Guests: {res.guests}</div>
                    {res.occasion && <div className="text-black/50 text-xs mt-1">Occasion: {res.occasion}</div>}
                    {res.requests && <div className="text-black/50 text-xs mt-1 italic">"{res.requests}"</div>}
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 text-xs border rounded-full uppercase tracking-widest ${getStatusColor(res.status)}`}>
                      {res.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    {res.status === 'pending' && (
                      <div className="flex justify-end gap-2">
                        <button 
                          onClick={() => updateStatus(res._id, 'approved')}
                          className="p-2 text-green-400 hover:bg-green-400/10 transition-colors rounded border border-green-400/20"
                          title="Approve"
                        >
                          <Check size={16} />
                        </button>
                        <button 
                          onClick={() => updateStatus(res._id, 'cancelled')}
                          className="p-2 text-red-400 hover:bg-red-400/10 transition-colors rounded border border-red-400/20"
                          title="Cancel"
                        >
                          <XIcon size={16} />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
              {reservations.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-black/50">
                    No reservations found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
