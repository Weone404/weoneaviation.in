import { NextResponse } from "next/server";

export function middleware(request) {
    const { pathname } = request.nextUrl;
    const decodedPath = (() => {
        try {
            return decodeURIComponent(pathname);
        } catch {
            return pathname;
        }
    })();
    const normalizedPath = decodedPath.replace(/%20/g, " ").toLowerCase();
    const legacyPaths = [
        "/pilot-course-&-pilot-training-in -ndia",
        "/pilot-course-&-pilot-training-in%20-ndia",
        "/pilot-course-&-pilot-training-in -ndia/",
        "/pilot-course-&-pilot-training-in%20-ndia/",
    ];

    if (legacyPaths.includes(normalizedPath)) {
        return NextResponse.redirect(new URL("/pilot-course-training-in-india", request.url));
    }

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
    matcher: ["/:path*"],
};