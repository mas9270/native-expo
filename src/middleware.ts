// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyAccessToken } from "./lib/tokenConfig";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("rasmastoken")?.value;
  const url = new URL(req.url);

  const protectedPaths = ["/admin"];
  const isProtected = protectedPaths.some((path) =>
    url.pathname.startsWith(path)
  );

  try {
    if (!token) {
      if (isProtected) {
        return NextResponse.redirect(new URL("/", req.url));
      }
      return NextResponse.next();
    }

    const payload = await verifyAccessToken(token);
    if (!payload) {
      if (isProtected) {
        return NextResponse.redirect(new URL("/", req.url));
      }
      return NextResponse.next();
    }

    return NextResponse.next();
  } catch (err) {
    console.error("Middleware error:", err);
    if (isProtected) return NextResponse.redirect(new URL("/", req.url));
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    "/",
    "/contact-us/:path*",
    "/about-us/:path*",
    "/admin/:path*",
  ],
};
