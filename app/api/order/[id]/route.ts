import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { Order } from "@/models/Order";
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

    jwt.verify(token, process.env.SECRET_AETHERY!) as JwtPayload;

    const { items, totalAmount, shippingAddress } = await req.json();
    const updateOrder: Record<string, any> = {};

    if (items) {
      if (!Array.isArray(items)) {
        return NextResponse.json({ message: "Invalid items" }, { status: 400 });
      }
      updateOrder.items = items;
    }

    if (totalAmount) {
      if (typeof totalAmount !== "number") {
        return NextResponse.json(
          { message: "Invalid totalAmount" },
          { status: 400 },
        );
      }
      updateOrder.totalAmount = totalAmount;
    }

    if (shippingAddress) {
      if (typeof shippingAddress !== "string") {
        return NextResponse.json(
          { message: "Invalid shippingAddress" },
          { status: 400 },
        );
      }
      updateOrder.shippingAddress = shippingAddress;
    }

    if (Object.keys(updateOrder).length === 0) {
      return NextResponse.json({ message: "Invalid Input" }, { status: 400 });
    }

    const order = await Order.findByIdAndUpdate(id, updateOrder, {
      new: true,
      runValidators: true,
    });

    if (!order) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Order updated", order },
      { status: 200 },
    );
  } catch (error) {
    console.log("Order PUT Error:", error);

    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
