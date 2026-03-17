import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../../../lib/db";
import User from "../../../../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { loginSchema } from "@/lib/Validation";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();

    const validation = loginSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.issues[0].message },
        { status: 400 },
      );
    }
    const { email, password} = validation.data;

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
    cookieStore.set("refresh_token", token, {
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
