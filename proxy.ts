import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const PROTECTED_ROUTES = ["/dashboard", "/profile", "/settings"];

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isProtected = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route)
  );
  if (!isProtected) return NextResponse.next();

  const accessToken = req.cookies.get("access_token")?.value;

  if (accessToken) {
    try {
      await jwtVerify(
        accessToken,
        new TextEncoder().encode(process.env.SECRET_AETHERY!)
      );
      return NextResponse.next();
    } catch {
      
    }
  }

  const refreshToken = req.cookies.get("refresh_token")?.value;
  if (refreshToken) {
    const refreshRes = await fetch(
      `${req.nextUrl.origin}/api/refresh`,
      {
        method: "POST",
        headers: { cookie: `refresh_token=${refreshToken}` },
      }
    );

    if (refreshRes.ok) {
      const response = NextResponse.next();
      refreshRes.headers.getSetCookie().forEach((cookie) => {
        response.headers.append("Set-Cookie", cookie);
      });
      return response;
    }
  }

  return NextResponse.redirect(new URL("/login", req.url));
}

export const config = {
  matcher: [
    "/dashboard/(.*)",
    "/profile/(.*)",
    "/settings/(.*)"
  ],
};