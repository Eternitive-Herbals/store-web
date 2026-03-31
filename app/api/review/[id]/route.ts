import connectDB from "@/lib/db";
import { Review } from "@/models/Review";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB();

    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    jwt.verify(token, process.env.SECRET_AETHERY!);

    const body = await req.json();

    const review = await Review.findByIdAndUpdate(params.id, body, { new: true });

    if (!review) {
      return NextResponse.json({ message: "Review not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Review updated", review }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}