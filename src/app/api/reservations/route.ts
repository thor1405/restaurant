import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Reservation from '@/models/Reservation';
import nodemailer from 'nodemailer';

export async function GET() {
  try {
    await dbConnect();
    const reservations = await Reservation.find({}).sort({ date: -1, time: -1 });
    return NextResponse.json({ success: true, data: reservations });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const reservation = await Reservation.create(body);
    
    // Notification logic
    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, ADMIN_EMAIL } = process.env;
    
    if (SMTP_HOST && SMTP_USER && SMTP_PASS) {
      const transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: Number(SMTP_PORT) || 587,
        auth: {
          user: SMTP_USER,
          pass: SMTP_PASS,
        },
      });

      const mailOptions = {
        from: `"L'Étoile Reservations" <${SMTP_USER}>`,
        to: ADMIN_EMAIL || SMTP_USER,
        subject: `New Reservation Request - ${reservation.name}`,
        text: `You have a new reservation request.\n\nName: ${reservation.name}\nEmail: ${reservation.email}\nPhone: ${reservation.phone}\nDate: ${reservation.date}\nTime: ${reservation.time}\nGuests: ${reservation.guests}\nOccasion: ${reservation.occasion || 'None'}\nRequests: ${reservation.requests || 'None'}\n\nPlease login to the admin dashboard to approve or cancel.`,
      };

      transporter.sendMail(mailOptions).catch(console.error);
    } else {
      console.warn("SMTP credentials not provided. Skipping email notification.");
    }

    return NextResponse.json({ success: true, data: reservation }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error }, { status: 400 });
  }
}
