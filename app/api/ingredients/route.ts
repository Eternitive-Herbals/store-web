import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { Ingredients } from "@/models/Ingredient";
import {cookies} from "next/headers"
import jwt,{JwtPayload} from "jsonwebtoken";



export async function GET() {
  try {
    await connectDB();



    const ingredients = await Ingredients.find();
    return NextResponse.json(ingredients, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: "Internal server error",err },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {

    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    if (decoded.role !== "Admin") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }
    const { name, description, image } = await req.json();

    if (!name || !description || !image) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 },
      );
    }

    await connectDB();


    const existing = await Ingredients.findOne({ name });

    if (existing) {
      return NextResponse.json(
        { message: "Ingredient already exists" },
        { status: 400 },
      );
    }
    const ingredient = await Ingredients.create({ name, description, image });
    return NextResponse.json(ingredient, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: "Internal server error",err },
      { status: 500 },
    );
  }
}
