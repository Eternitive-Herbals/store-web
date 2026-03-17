import { Product } from "@/models/Product";
import connectDB from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const searchParams = req.nextUrl.searchParams;

    const ingredients = searchParams.get("ingredients");
    const filter: any = {};

    if (ingredients) {
      filter.ingredients = { $regex: ingredients, $options: "i" };
    }
    const products = await Product.find(filter).sort({ createdAt: -1 });

    return NextResponse.json(products, {
      status: 200,
    });
  } catch (error) {
    console.log("Product Not Found", error);

    return NextResponse.json(
      {
        message: "Server error",
      },
      { status: 500 },
    );
  }
}
export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { name, description, ingredients, price, image, type } = await req.json();

    if (!name || !description || !ingredients || !price || !image || !type) {
      return NextResponse.json(
        {
          message: "All Fields required",
        },
        { status: 400 },
      );
    }

    const product = await Product.create({
      name,
      description,
      ingredients,
      price,
      type,
      image,
    });

    return NextResponse.json(
      {
        message: "Product Created Successfully",
        product,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.log("Product creation error:", error);

    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
