import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/token";
import connectDB from "@/lib/db";
import User from "@/models/User";

export async function GET() {
  try {
    await connectDB();

    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;

    if (!token) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    const decoded = verifyToken(token);

    console.log("DECODED TOKEN:", decoded);

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 401 });
    }
    console.log("COOKIE:", (await cookies()).get("access_token"));

    console.log("AUTHENTICATE USER FROM DB:", user);

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error("AUTH /me ERROR:", error);
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    await connectDB();

    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const decoded = verifyToken(token);
    const body = await req.json();

    const updatedUser = await User.findByIdAndUpdate(
      decoded.userId,
      { $set: body },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user: updatedUser }, { status: 200 });
  } catch (error) {
    console.error("AUTH /me PUT ERROR:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
