import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { CarouselItem } from "@/models/CarouselItem";
import { Product } from "@/models/Product"; // Ensure Product model is registered for mongoose populate

export async function GET() {
  try {
    await connectDB();
    const items = await CarouselItem.find({ isActive: true })
      .populate("product")
      .sort({ order: 1, createdAt: -1 }).lean();

    return NextResponse.json(items, { status: 200 });
  } catch (err) {
    console.error("GET /api/carousel error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
