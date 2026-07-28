import { NextResponse } from 'next/server';
import { signJwt } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    const validUsername = process.env.ADMIN_USERNAME || 'admin';
    const validPassword = process.env.ADMIN_PASSWORD || 'admin123';

    if (username === validUsername && password === validPassword) {
      const token = await signJwt({ username });

      // In Next.js 15, cookies() is awaited or accessed differently, but `await cookies()` is recommended for 15.
      // Wait, let's use the NextResponse object to set the cookie directly to be safe across versions.
      const response = NextResponse.json({ success: true }, { status: 200 });
      
      response.cookies.set({
        name: 'admin_token',
        value: token,
        httpOnly: true,
        secure: false, // Set to false to allow local HTTP testing on Pi
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24, // 1 day
      });

      return response;
    }

    return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ success: false, message: error instanceof Error ? error.message : 'Internal server error' }, { status: 500 });
  }
}
