import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";

export const dynamic = 'force-dynamic';

export async function GET(request: Request, { params }: { params: Promise<{ filename: string }> }) {
  try {
    const { filename } = await params;
    const filepath = path.join(process.cwd(), "public", "uploads", filename);
    
    try {
      const buffer = await readFile(filepath);
      
      const ext = path.extname(filename).toLowerCase();
      let contentType = "image/jpeg";
      if (ext === ".png") contentType = "image/png";
      else if (ext === ".webp") contentType = "image/webp";
      else if (ext === ".gif") contentType = "image/gif";
      else if (ext === ".svg") contentType = "image/svg+xml";
      
      return new NextResponse(buffer, {
        headers: {
          "Content-Type": contentType,
          "Cache-Control": "public, max-age=31536000",
          "X-Debug-Path": filepath,
        },
      });
    } catch (fsError: any) {
      return new NextResponse("File not found on disk: " + filepath + " Error: " + fsError.message, { status: 404 });
    }
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
