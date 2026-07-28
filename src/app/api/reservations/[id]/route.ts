import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Reservation from '@/models/Reservation';

export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    await dbConnect();
    const body = await request.json();
    const reservation = await Reservation.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });
    if (!reservation) {
      return NextResponse.json({ success: false }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: reservation });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}
