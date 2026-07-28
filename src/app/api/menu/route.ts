import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Menu from '@/models/Menu';

export async function GET() {
  try {
    await dbConnect();
    const menuItems = await Menu.find({}).sort({ category: 1, name: 1 });
    return NextResponse.json({ success: true, data: menuItems });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const menuItem = await Menu.create(body);
    return NextResponse.json({ success: true, data: menuItem }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}
