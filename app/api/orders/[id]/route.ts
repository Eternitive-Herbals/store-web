import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { Order } from "@/models/Order";
import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
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
      process.env.JWT_SECRET!
    ) as JwtPayload;

    if (decoded.role !== "Admin") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const { status, shippingAddress, items, totalAmount } = await req.json();
    
    // We update the order. If status is provided, we map over items to update their status.
    const order = await Order.findById(id);
    if (!order) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    if (shippingAddress) {
      order.shippingAddress = shippingAddress;
    }

    if (items !== undefined) {
      if (items.length === 0) {
        // If the order has no items, delete it ("cancel" it)
        await Order.findByIdAndDelete(id);
        return NextResponse.json(
          { message: "Order canceled because it has no items" },
          { status: 200 }
        );
      }
      order.items = items;
      if (totalAmount !== undefined) {
        order.totalAmount = totalAmount;
      }
    }

    if (status) {
      order.items.forEach((item: any) => {
        item.status = status;
      });
    }

    await order.save();

    return NextResponse.json(
      { message: "Order updated successfully", order },
      { status: 200 }
    );
  } catch (error) {
    console.error("Order PUT Error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    console.log("DELETE Request received for Order ID:", id);

    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as JwtPayload;

    if (decoded.role !== "Admin") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const order = await Order.findByIdAndDelete(id);

    if (!order) {
      console.log("Order not found in DB for ID:", id);
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Order deleted", order },
      { status: 200 }
    );
  } catch (error) {
    console.error("Order DELETE Error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
