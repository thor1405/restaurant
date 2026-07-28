import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Menu from '@/models/Menu';

export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    await dbConnect();
    const body = await request.json();
    const menuItem = await Menu.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });
    if (!menuItem) {
      return NextResponse.json({ success: false }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: menuItem });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    await dbConnect();
    const deletedMenu = await Menu.deleteOne({ _id: id });
    if (!deletedMenu) {
      return NextResponse.json({ success: false }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}
