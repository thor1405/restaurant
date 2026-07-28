import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import SlotConfig from '@/models/SlotConfig';
import Reservation from '@/models/Reservation';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');

    if (!date) {
      return NextResponse.json({ success: false, message: 'Date is required' }, { status: 400 });
    }

    await dbConnect();
    
    // Get all configured slots
    const slots = await SlotConfig.find({}).sort({ time: 1 });
    
    // Get all non-cancelled reservations for the given date
    const reservations = await Reservation.find({ 
      date, 
      status: { $in: ['pending', 'approved'] } 
    });

    // Calculate available capacity per slot
    const availableSlots = slots.map(slot => {
      const slotReservations = reservations.filter(r => r.time === slot.time);
      const bookedGuests = slotReservations.reduce((sum, res) => sum + res.guests, 0);
      const availableCapacity = slot.maxGuests - bookedGuests;

      return {
        time: slot.time,
        availableCapacity: Math.max(0, availableCapacity)
      };
    });

    return NextResponse.json({ success: true, data: availableSlots });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}
