import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { AUTH_COOKIE } from "@/lib/auth-types";

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const token = request.cookies.get(AUTH_COOKIE)
    const isProtected = 
    pathname.startsWith('/checkout') ||
    pathname.startsWith('/admin')

    if(isProtected && !token) {
        const loginUrl = new URL('/login', request.url)
        loginUrl.searchParams.set('callback', pathname)
        return NextResponse.redirect(loginUrl)
    }
    return NextResponse.next()
}

export const config = {
    matcher: ['/checkout/:path*','/admin/:path*'],
}