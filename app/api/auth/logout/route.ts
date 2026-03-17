import connectDB from "@/lib/db";
import User from "@/models/User";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refresh_token")?.value;

  if (refreshToken) {
    const decoded: any = jwt.decode(refreshToken);

    await connectDB();

    await User.findByIdAndUpdate(decoded.userId, {
      refreshToken: null,
    });
  }

  cookieStore.set("access_token", "", { maxAge: 0 });
  cookieStore.set("refresh_token", "", { maxAge: 0 });

  return NextResponse.json({ message: "Logged out" });
}