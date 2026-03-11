import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../../lib/db";
import User from "../../../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { username, email, password } = await req.json();

    // Validation
    if (!username || !email || !password) {
      return NextResponse.json(
        { message: "username, email and password are required" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // Generate JWT
    const token = jwt.sign(
      {
        userId: newUser._id.toString(),
        email: newUser.email,
      },
      process.env.SECRET_AETHERY!,
      { expiresIn: "10d" }
    );

    // Set cookie
    const cookieStore = await cookies();

    cookieStore.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 10,
    });

    return NextResponse.json(
      {
        message: "User created successfully",
        accessToken: token,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log("Signup error:", error);

    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}