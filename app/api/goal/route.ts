import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { Goal } from "@/models/Goal";

export async function GET() {
  try {
    await connectDB();
    const goals = await Goal.find();
    return NextResponse.json(goals, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name, image } = await req.json();

    if (!name || !image) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 },
      );
    }

    await connectDB();
    const goals = await Goal.create({ name, image });
    return NextResponse.json(goals, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
