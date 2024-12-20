import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const authCookie = request.cookies.get("auth")?.value || null;
  const url = request.nextUrl.clone();
  const excludedPaths = [
    "/sea-master-logo-light.svg",
    "/sea-master-logo.svg",
    "/favicon.ico",
    "/google-btn-logo.png",
  ];
  if (excludedPaths.some((path) => url.pathname === path)) {
    return NextResponse.next();
  }
  if (authCookie) {
    try {
      const decoded = decodeURIComponent(authCookie);
      const parsed = JSON.parse(decoded);
      const token = parsed.state.token;
      const role = parsed.state.role;
      const isAdminRoute = url.pathname.startsWith("/admin");
      const isAuthRoute = ["/sign-in", "/sign-up"].includes(url.pathname);
      if (token) {
        if (isAuthRoute) {
          url.pathname = "/chat";
          return NextResponse.redirect(url);
        }
        if (isAdminRoute && role !== "SuperAdmin") {
          url.pathname = "/chat";
          return NextResponse.redirect(url);
        }
        if (!isAdminRoute && role === "SuperAdmin") {
          url.pathname = "/admin";
          return NextResponse.redirect(url);
        }
      } else {
        if (!isAuthRoute) {
          url.pathname = "/sign-in";
          return NextResponse.redirect(url);
        }
      }
    } catch {
      url.pathname = "/sign-in";
      return NextResponse.redirect(url);
    }
  }
  const isAuthRoute = ["/sign-in", "/sign-up"].includes(url.pathname);
  if (!authCookie && !isAuthRoute) {
    url.pathname = "/sign-in";
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/).*)"],
};
