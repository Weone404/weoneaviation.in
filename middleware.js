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

    const bucketBPaths = [
        "/jkit-header/",
        "/jkit-footer/",
        "/elementor-hf/",
        "/e-floating-buttons/",
        "/form_submission/",
    ];

    if (bucketBPaths.some(prefix => normalizedPath.startsWith(prefix))) {
        return new NextResponse(null, { status: 410 });
    }

    // ✅ Always let the login page through, including the exact root admin-login URL
    if (pathname === "/admin/login" || pathname === "/admin/login/" || pathname.startsWith("/admin/login")) {
        return NextResponse.next();
    }

    // ✅ Protect all /admin routes except login
    if (pathname.startsWith("/admin")) {
        const session = request.cookies.get("weone_admin");
        if (!session) {
            const loginUrl = new URL("/admin/login", request.url);
            if (request.nextUrl.pathname !== "/admin/login") {
                return NextResponse.redirect(loginUrl);
            }
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/:path*"],
};