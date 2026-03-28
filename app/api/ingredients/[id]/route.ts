import connectDB from "@/lib/db";
import { Ingredients } from "@/models/Ingredient";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB();

    const body = await req.json();

    const ingredient = await Ingredients.findByIdAndUpdate(params.id, body, { new: true });

    if (!ingredient) {
      return NextResponse.json({ message: "Ingredient not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Ingredient updated", ingredient }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}