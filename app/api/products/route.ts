import { Product } from "@/models/Product";
import connectDB from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";

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

    await connectDB();
    const {
      name,
      description,
      ingredients,
      price,
      image,
      category,
      dosage,
      goal,
    } = await req.json();

    if (
      !name ||
      !description ||
      !ingredients ||
      !price ||
      !image ||
      !category ||
      !dosage ||
      !goal
    ) {
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
      category,
      goal,
      dosage,
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
