import { NextResponse } from "next/server";

/**
 * Case-sensitive legacy URL redirects.
 *
 * These CANNOT live in next.config.js: its `redirects()` matcher is
 * case-INSENSITIVE, so a rule mapping `/Indigo-pilot-preparation` to
 * `/indigo-pilot-preparation` also matches the lowercase URL and redirects it
 * to itself, producing an infinite loop (caught during the 2026-08-11 GEO
 * audit fixes). Middleware sees the raw pathname and can compare exactly.
 *
 * Context: these two pages shipped with capitalised filenames, so Google
 * indexed the capitalised URLs while any lowercased inbound link 404'd. The
 * files are now lowercase; these redirects preserve the indexed URLs.
 */
const EXACT_CASE_REDIRECTS = {
    "/Indigo-pilot-preparation": "/indigo-pilot-preparation",
    "/Airindia-pilot-preparation": "/airindia-pilot-preparation",
};

export function middleware(request) {
    const { pathname } = request.nextUrl;

    // ── Legacy capitalised URLs → lowercase canonical ──────────────────────
    // Exact match only: the lowercase form must fall through untouched.
    const target = EXACT_CASE_REDIRECTS[pathname];
    if (target && target !== pathname) {
        return NextResponse.redirect(new URL(target, request.url), 308);
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
    // Matcher must now cover the redirect paths too, not just /admin.
    matcher: [
        "/admin/:path*",
        "/Indigo-pilot-preparation",
        "/Airindia-pilot-preparation",
    ],
};
