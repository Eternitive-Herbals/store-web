import connectDB from "@/lib/db";
import { Goal } from "@/models/Goal";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    await connectDB();
    const { id } = await params;

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
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const { name, image } = await req.json();

    const updateGoal: any = {};

    if (name) {
      if (typeof name !== "string") {
        return NextResponse.json({ message: "invalid input" }, { status: 400 });
      }
      updateGoal.name = name;
    }

    if (image) {
      if (typeof image !== "string") {
        return NextResponse.json({ message: "invalid input" }, { status: 400 });
      }
      updateGoal.image = image;
    }

    if (Object.keys(updateGoal).length === 0) {
      return NextResponse.json({ message: "Invalid Input" }, { status: 400 });
    }

    const goal = await Goal.findByIdAndUpdate(id, updateGoal, {
      new: true,
      runValidators: true,
    });

    if (!goal) {
      return NextResponse.json({ message: "Goal not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Goal updated", goal },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong", error },
      { status: 500 },
    );
  }
}
