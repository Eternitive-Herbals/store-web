import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { Goal } from "@/models/Goal";
import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";
export async function GET() {
  try {
    await connectDB();
    const goals = await Goal.find();
    return NextResponse.json(goals, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: "Internal server error", err },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(
      token,
      process.env.SECRET_AETHERY!,
    ) as JwtPayload;

    if (decoded.role !== "Admin") {
      return NextResponse.json({ message: "Forbidden" }, { status: 401 });
    }

    const { name, image } = await req.json();

    if (!name || !image) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 },
      );
    }

    const goals = await Goal.create({ name, image });
    return NextResponse.json(goals, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: "Internal server error", err },
      { status: 500 },
    );
  }
}
