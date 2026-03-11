import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../../lib/db";
import User from "../../../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 },
      );
    }

    const user = await User.findOne({ email });

    if (!user || !user.password) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 },
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 },
      );
    }

    const token = jwt.sign(
      { userId: user._id.toString(), email: user.email },
      process.env.SECRET_AETHERY!,
      { expiresIn: "10d" },
    );

    const cookieStore = await cookies();
    cookieStore.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return NextResponse.json(
      {
        message: "Login successful",
        accessToken: token,
      },
      { status: 200 },
    );
  } catch (error) {
    console.log("something wend twrong please try after some time", error);

    return NextResponse.json({ message: "Servor error" }, { status: 500 });
  }
}
