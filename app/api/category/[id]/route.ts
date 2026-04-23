import connectDB from "@/lib/db";
import { Category } from "@/models/Category";
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
      process.env.JWT_SECRET!,
    ) as JwtPayload;

    if (decoded.role !== "Admin") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const { name } = await req.json();

    const updateCategory: any = {};

    if (name) {
      if (typeof name !== "string") {
        return NextResponse.json({ message: "invalid input" }, { status: 400 });
      }
      updateCategory.name = name;
    }

    if (Object.keys(updateCategory).length === 0) {
      return NextResponse.json({ message: "Invalid Input" }, { status: 400 });
    }

    const category = await Category.findByIdAndUpdate(id, updateCategory, {
      new: true,
      runValidators: true,
    });

    if (!category) {
      return NextResponse.json(
        { message: "Category not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { message: "Category updated", category },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong", error },
      { status: 500 },
    );
  }
}
