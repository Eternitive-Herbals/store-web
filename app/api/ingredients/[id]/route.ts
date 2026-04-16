import connectDB from "@/lib/db";
import { Ingredients } from "@/models/Ingredient";
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

    const ingredient = await Ingredients.findByIdAndUpdate(params.id, body, { new: true });

    if (!ingredient) {
      return NextResponse.json({ message: "Ingredient not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Ingredient updated", ingredient }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Something went wrong",error }, { status: 500 });
  }
}