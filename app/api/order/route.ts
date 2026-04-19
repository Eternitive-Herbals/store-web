import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { Order } from "@/models/Order";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const decoded: any = jwt.verify(token, process.env.SECRET_AETHERY!);
    const userId = decoded.userId;

    const { items, totalAmount, shippingAddress } = await req.json();

    if (!items || !totalAmount || !shippingAddress) {
      return NextResponse.json(
        {
          message: "All Fields required",
        },
        { status: 400 },
      );
    }

    const order = await Order.create({
      user: userId,
      items,
      totalAmount,
      shippingAddress,
    });

    return NextResponse.json(
      { message: "Order created", order },
      { status: 201 },
    );
  } catch (error) {
    console.log("Order creation error:", error);

    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();

    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const decoded: any = jwt.verify(token, process.env.SECRET_AETHERY!);
    const userId = decoded.userId;

    const orders = await Order.find({ user: userId })
      .populate("items.product")
      .sort({ createdAt: -1 });

    return NextResponse.json(orders);
  } catch (error) {
    console.log("Fetch orders error:", error);

    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
