import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
    try {
        const token = await getToken({ req });

        if (!token) {
            return NextResponse.redirect(new URL('/sign-in', req.nextUrl));
        }
        
        return NextResponse.next();
    } catch (error) {
        console.error("Error fetching token:", error);
        return NextResponse.redirect(new URL('/sign-in', req.nextUrl));
    }
}

export const config = {
    matcher: ['/r/:path*/submit', '/r/create'],
};
