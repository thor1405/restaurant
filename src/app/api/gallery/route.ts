import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Gallery from "@/models/Gallery";
import { verifyJwt } from "@/lib/auth";

export async function GET() {
  try {
    await dbConnect();
    const items = await Gallery.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: items });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const token = request.headers.get("cookie")?.split("; ").find(row => row.startsWith("admin_token="))?.split("=")[1];
    if (!token || !(await verifyJwt(token))) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const body = await request.json();
    const item = await Gallery.create(body);
    
    return NextResponse.json({ success: true, data: item }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
