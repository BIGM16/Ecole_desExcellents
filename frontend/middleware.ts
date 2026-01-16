import { NextRequest, NextResponse } from "next/server";

const protectedPrefixes = ["/admin", "/coordon", "/encadreur", "/etudiant"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isProtected = protectedPrefixes.some((p) => pathname.startsWith(p));

  if (!isProtected) {
    return NextResponse.next();
  }

  const token = req.cookies.get("accessToken")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
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
