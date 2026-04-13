import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const ADMIN_ROUTES = ["/admin"];

export async function proxy(req: NextRequest) {
  const { pathname, origin } = req.nextUrl;

  const isAdminRoute = ADMIN_ROUTES.some((route) =>
    pathname.startsWith(route)
  );

  if (!isAdminRoute) return NextResponse.next();

  const secret = new TextEncoder().encode(process.env.SECRET_AETHERY!);

  const accessToken = req.cookies.get("access_token")?.value;

  if (accessToken) {
    try {
      const { payload } = await jwtVerify(accessToken, secret);

      if (payload.role === "admin") {
        return NextResponse.next();
      }
    } catch {}
  }

  const refreshToken = req.cookies.get("refresh_token")?.value;

  if (refreshToken) {
    try {
      const refreshRes = await fetch(`${origin}/api/refresh`, {
        method: "POST",
        headers: {
          cookie: `refresh_token=${refreshToken}`,
        },
      });

      if (refreshRes.ok) {
        const setCookie = refreshRes.headers.get("set-cookie");

        if (setCookie) {
          const match = setCookie.match(/access_token=([^;]+)/);
          const newAccessToken = match?.[1];

          if (newAccessToken) {
            const { payload } = await jwtVerify(newAccessToken, secret);

            if (payload.role === "Admin") {
              const response = NextResponse.next();
              response.headers.append("Set-Cookie", setCookie);
              return response;
            }
          }
        }
      }
    } catch {}
  }

  return NextResponse.redirect(new URL("/login", req.url));
}

export const config = {
  matcher: ["/admin/:path*"],
};