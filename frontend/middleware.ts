import { NextRequest, NextResponse } from "next/server";

const protectedPrefixes = ["/admin", "/coordon", "/encadreur", "/etudiant"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isProtected = protectedPrefixes.some((p) => pathname.startsWith(p));

  if (!isProtected) {
    return NextResponse.next();
  }

  // ✅ Chercher le bon cookie: "access_token" (du serveur Django)
  const token = req.cookies.get("access_token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/coordon/:path*",
    "/encadreur/:path*",
    "/etudiant/:path*",
  ],
};
