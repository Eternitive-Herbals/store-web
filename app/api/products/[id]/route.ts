import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { Product } from "@/models/Product";
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
      process.env.JWT_SECRET!,
    ) as JwtPayload;

    if (decoded.role !== "Admin") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }
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
    const updateProduct: Record<string, any> = {};
    if (name) {
      if (typeof name !== "string") {
        return NextResponse.json({ message: "Invalid name" }, { status: 400 });
      }
      updateProduct.name = name;
    }

    if (description) {
      if (typeof description !== "string") {
        return NextResponse.json(
          { message: "Invalid description" },
          { status: 400 },
        );
      }
      updateProduct.description = description;
    }

    if (ingredients) {
      if (!Array.isArray(ingredients)) {
        return NextResponse.json(
          { message: "Invalid ingredients" },
          { status: 400 },
        );
      }
      updateProduct.ingredients = ingredients;
    }

    if (price) {
      if (typeof price !== "number") {
        return NextResponse.json({ message: "Invalid price" }, { status: 400 });
      }
      updateProduct.price = price;
    }

    if (image) {
      if (typeof image !== "string") {
        return NextResponse.json({ message: "Invalid image" }, { status: 400 });
      }
      updateProduct.image = image;
    }

    if (category) {
      if (!Array.isArray(category)) {
        return NextResponse.json(
          { message: "Invalid category" },
          { status: 400 },
        );
      }
      updateProduct.category = category;
    }

    if (dosage) {
      if (typeof dosage !== "string") {
        return NextResponse.json(
          { message: "Invalid dosage" },
          { status: 400 },
        );
      }
      updateProduct.dosage = dosage;
    }

    if (goal) {
      if (!Array.isArray(goal)) {
        return NextResponse.json({ message: "Invalid goal" }, { status: 400 });
      }
      updateProduct.goal = goal;
    }

    if (Object.keys(updateProduct).length === 0) {
      return NextResponse.json({ message: "Invalid Input" }, { status: 400 });
    }

    const product = await Product.findByIdAndUpdate(id, updateProduct, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { message: "Product updated", product },
      { status: 200 },
    );
  } catch (error) {
    console.log("Product PUT Error:", error);

    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}


export async function DELETE(req:NextRequest,{
  params}:{params:Promise<{id:string}>}){

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
      process.env.JWT_SECRET!,
    ) as JwtPayload;

    if (decoded.role !== "Admin") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { message: "Product deleted", product },
      { status: 200 },
    );
  } catch (error) {
    console.log("Product DELETE Error:", error);

    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}