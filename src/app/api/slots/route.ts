import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import SlotConfig from '@/models/SlotConfig';

export async function GET() {
  try {
    await dbConnect();
    const slots = await SlotConfig.find({}).sort({ time: 1 });
    return NextResponse.json({ success: true, data: slots });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    
    // Check if slot already exists, if so update it
    const existingSlot = await SlotConfig.findOne({ time: body.time });
    let slot;
    if (existingSlot) {
      existingSlot.maxGuests = body.maxGuests;
      slot = await existingSlot.save();
    } else {
      slot = await SlotConfig.create(body);
    }
    
    return NextResponse.json({ success: true, data: slot }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const time = searchParams.get('time');
    
    await dbConnect();
    await SlotConfig.deleteOne({ time });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}
