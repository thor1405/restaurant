import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Settings from "@/models/Settings";
import { verifyJwt } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await dbConnect();
    let settings = await Settings.findOne();
    
    if (!settings) {
      settings = await Settings.create({});
    }

    return NextResponse.json({ success: true, data: settings });
  } catch (error) {
    console.error("Error fetching settings:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    // Authenticate
    const token = request.headers.get("cookie")?.split("; ").find(row => row.startsWith("admin_token="))?.split("=")[1];
    if (!token || !(await verifyJwt(token))) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const body = await request.json();
    
    const settings = await Settings.findOneAndUpdate({}, body, {
      new: true,
      upsert: true,
      runValidators: true,
    });

    revalidatePath("/", "layout");

    return NextResponse.json({ success: true, data: settings });
  } catch (error) {
    console.error("Error updating settings:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
