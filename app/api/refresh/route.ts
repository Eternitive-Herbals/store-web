import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../../lib/db";
import User from "../../../models/userModel";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refresh_token")?.value;

    if (!refreshToken) {
      return NextResponse.json({ message: "No refresh token" }, { status: 401 });
    }

    
    let payload: { userId: string };
    try {
      payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!) as {
        userId: string;
      };
    } catch {
      return NextResponse.json({ message: "Invalid or expired refresh token" }, { status: 401 });
    }

    await connectDB();

    
    const user = await User.findOne({
      _id: payload.userId,
      refreshTokens: refreshToken,
    });

    if (!user) {
      return NextResponse.json({ message: "Refresh token revoked" }, { status: 401 });
    }

   
    user.refreshTokens = user.refreshTokens.filter((t: string) => t !== refreshToken);

    const newAccessToken = jwt.sign(
      { userId: user._id.toString(), email: user.email },
      process.env.SECRET_AETHERY!,
      { expiresIn: "1h" }
    );

    const newRefreshToken = jwt.sign(
      { userId: user._id.toString() },
      process.env.REFRESH_TOKEN_SECRET!,
      { expiresIn: "30d" }
    );

    user.refreshTokens.push(newRefreshToken);
    await user.save();

    cookieStore.set("access_token", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60,
    });

    cookieStore.set("refresh_token", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });

    return NextResponse.json({ message: "Token refreshed" }, { status: 200 });
  } catch (error) {
    console.error("Refresh error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}