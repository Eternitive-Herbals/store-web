import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { Ingredients } from "@/models/Ingredient";
import {cookies} from "next/headers"
import jwt from "jsonwebtoken";
import { getUserFromRequest } from "@/lib/getUserFromRequest";

export async function GET() {
  try {
    await connectDB();

    const cookieStore = await cookies()
    const token = cookieStore.get("access_token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    };

    jwt.verify(token, process.env.SECRET_AETHERY!);

    const user = await getUserFromRequest()

    if(user.role !== "admin") {
      return NextResponse.json({message:"Not for User or Distributor"},{status: 401})
    }

  


    const ingredients = await Ingredients.find();
    return NextResponse.json(ingredients, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name, description, image } = await req.json();

    if (!name || !description || !image) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 },
      );
    }

    await connectDB();
    const ingredient = await Ingredients.create({ name, description, image });
    return NextResponse.json(ingredient, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
