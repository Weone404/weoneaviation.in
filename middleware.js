import { NextResponse } from "next/server";

export function middleware(request) {
    const { pathname } = request.nextUrl;

    // ✅ Always let the login page through
    if (pathname.startsWith("/admin/login")) {
        return NextResponse.next();
    }

    // ✅ Protect all /admin routes
    if (pathname.startsWith("/admin")) {
        const session = request.cookies.get("weone_admin");
        if (!session) {
            return NextResponse.redirect(new URL("/admin/login", request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*"],
};