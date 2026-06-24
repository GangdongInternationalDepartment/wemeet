import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("admin_token")?.value;
  const validToken = process.env.ADMIN_TOKEN;
  const isAuthenticated = !!token && !!validToken && token === validToken;

  // Admin sub-pages (not login itself) → require auth
  if (pathname.startsWith("/admin/")) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  // Login page → redirect to dashboard if already authenticated
  if (pathname === "/admin" && isAuthenticated) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  // Admin API routes (except login) → require auth
  if (pathname.startsWith("/api/admin/") && !pathname.endsWith("/login")) {
    if (!isAuthenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*", "/api/admin/:path*"],
};
