import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../../lib/db";
import User from "../../../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { username, email, password } = await req.json();

    if (!username || !email || !password) {
      return NextResponse.json(
        { message: "username, email and password are required" },
        { status: 400 },
      );
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    const accessToken = jwt.sign(
      { userId: newUser._id.toString(), email: newUser.email },
      process.env.SECRET_AETHERY!,
      { expiresIn: "15m" },
    );

    const refreshToken = jwt.sign(
      { userId: newUser._id.toString() },
      process.env.REFRESH_TOKEN_SECRET!,
      { expiresIn: "7d" },
    );

    newUser.refreshToken = refreshToken;
    await newUser.save();
    const cookieStore = await cookies();

    cookieStore.set("access_token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 15,
    });

    cookieStore.set("refresh_token", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 },
    );
  } catch (error) {
    console.log("Signup error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
