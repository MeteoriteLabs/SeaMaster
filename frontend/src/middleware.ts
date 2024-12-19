import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const authCookie = request.cookies.get("auth")?.value || null;
  const url = request.nextUrl.clone();

  // Exclude requests for static assets in the public folder
  const excludedPaths = [
    "/sea-master-logo-light.svg",
    "/sea-master-logo.svg",
    "/favicon.ico",
    "/google-btn-logo.png",
  ];
  if (excludedPaths.some((path) => url.pathname === path)) {
    return NextResponse.next();
  }

  // Check if auth cookie exists
  if (authCookie) {
    try {
      const decoded = decodeURIComponent(authCookie);
      const parsed = JSON.parse(decoded);
      const token = parsed.state.token;
      const role = parsed.state.role;

      const isAdminRoute = url.pathname.startsWith("/admin");
      const isAuthRoute = ["/sign-in", "/sign-up"].includes(url.pathname);

      if (token) {
        // Redirect authenticated users away from sign-in/sign-up
        if (isAuthRoute) {
          url.pathname = "/chat";
          return NextResponse.redirect(url);
        }

        // Restrict access to /admin for non-SuperAdmin roles
        if (isAdminRoute && role !== "SuperAdmin") {
          url.pathname = "/chat";
          return NextResponse.redirect(url);
        }

        // Redirect SuperAdmin users to /admin for non-admin routes
        if (!isAdminRoute && role === "SuperAdmin") {
          url.pathname = "/admin";
          return NextResponse.redirect(url);
        }
      } else {
        // If no token but authCookie exists, redirect to sign-in
        if (!isAuthRoute) {
          url.pathname = "/sign-in";
          return NextResponse.redirect(url);
        }
      }
    } catch (error) {
      console.error("Failed to parse auth cookie:", error);
      // Optional: Redirect to /sign-in in case of errors
      url.pathname = "/sign-in";
      return NextResponse.redirect(url);
    }
  }

  // No authCookie: Redirect to sign-in for protected routes
  const isAuthRoute = ["/sign-in", "/sign-up"].includes(url.pathname);
  if (!authCookie && !isAuthRoute) {
    url.pathname = "/sign-in";
    return NextResponse.redirect(url);
  }

  return NextResponse.next(); // Allow access if no conditions match
}

export const config = {
  matcher: ["/((?!_next/).*)"], // Exclude all /_next routes from middleware
};
