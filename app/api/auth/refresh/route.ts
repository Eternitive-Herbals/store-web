import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/User";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refresh_token")?.value;

    if (!refreshToken) {
      return NextResponse.json(
        { message: "No refresh token" },
        { status: 401 },
      );
    }

    let payload: { userId: string };
    try {
      payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!) as {
        userId: string;
      };
    } catch {
      return NextResponse.json(
        { message: "Refresh token expired, please login again" },
        { status: 401 },
      );
    }

    await connectDB();

    const user = await User.findById(payload.userId);

    if (!user || !user.refreshToken) {
      return NextResponse.json(
        { message: "Invalid refresh token" },
        { status: 401 },
      );
    }

    const isValid = await bcrypt.compare(refreshToken, user.refreshToken);
    if (!isValid)
      return NextResponse.json(
        { message: "Invalid refresh token" },
        { status: 401 },
      );

    const newAccessToken = jwt.sign(
      { userId: user._id.toString(), email: user.email },
      process.env.SECRET_AETHERY!,
      { expiresIn: "30s" },
    );

    cookieStore.set("access_token", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 15,
    });

    return NextResponse.json(
      { message: "Access token refreshed" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Refresh error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
