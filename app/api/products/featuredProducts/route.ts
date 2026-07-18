import connectDB from "@/lib/db";
import { Product } from "@/models/Product";
import { NextResponse } from "next/server";

export interface Productf {
  _id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  createdAt: string;
}
export async function GET() {
  try {
    await connectDB();

    const products = await Product.find()
      .sort({ createdAt: -1 })
      .limit(3)
      .lean();

    return NextResponse.json(products);
  } catch (err) {
    console.error(err);

    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
