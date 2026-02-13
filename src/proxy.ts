import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { AUTH_COOKIE, User, UserRole } from "@/lib/auth-types";

const PROTECTED_ROUTES = {
    '/checkout': ['admin', 'customer'],
    '/admin': ['admin'],
}
export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const authCookie = request.cookies.get(AUTH_COOKIE)
    let user: User | null = null; 
    if(authCookie) {
        try {
            user = JSON.parse(authCookie.value);
        }
        catch {
            user = null;
        }
    }

    const isLoggedin = !!user;
    if(isLoggedin && pathname === '/login') {
        const target = user?.role === 'admin' ? '/admin' : '/';
        return NextResponse.redirect(new URL(target, request.url));
    }
    
    const protectedRouteKey = Object.keys(PROTECTED_ROUTES).find(route => pathname.startsWith(route));
    if(protectedRouteKey) {
        if(!isLoggedin) {
            const url = new URL('login', request.url);
            url.searchParams.set('callbackUrl', pathname);
            return NextResponse.redirect(url);
        }

        const allowedRoles = PROTECTED_ROUTES[protectedRouteKey as keyof typeof PROTECTED_ROUTES];
        if(user && !allowedRoles.includes(user.role as UserRole)) {
            return NextResponse.redirect(new URL('/access-denied', request.url));
        }
    }
    return NextResponse.next();
}