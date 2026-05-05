import { NextResponse } from "next/server";
import crypto from "crypto";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/token";
import connectDB from "@/lib/db";
import { Cart } from "@/models/Cart";
import { Transaction } from "@/models/Transaction";
import { Order } from "@/models/Order";

export async function POST(req: Request) {
  try {
    await connectDB();

    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    const decoded = verifyToken(token);
    const userId = String(decoded.userId);

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderId,
    } = await req.json();

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature ||
      !orderId
    ) {
      return NextResponse.json(
        { success: false, message: "Missing payment data" },
        { status: 400 },
      );
    }

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const secret = process.env.RAZORPAY_KEY_SECRET || process.env.NEXT_PUBLIC_RAZORPAY_KEY_SECRET || "";
    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json(
        { success: false, message: "Invalid Signature" },
        { status: 400 },
      );
    }

    const order = await Order.findById(orderId);

    if (!order) {
      return NextResponse.json(
        { success: false, message: "Order not found" },
        { status: 404 },
      );
    }

    await Transaction.create({
      user: userId,
      amount: order.totalAmount,
      paymentMethod: "upi",
      order: orderId,
    });

    await Order.findByIdAndUpdate(orderId, {
      status: "paid",
      $set: { "items.$[].status": "paid" }
    });

    await Cart.findOneAndUpdate({ userId: userId }, { $set: { items: [] } });

    return NextResponse.json({
      success: true,
      message: "Payment verified successfully",
    });
  } catch (error) {
    console.error("VERIFY ERROR:", error);

    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 },
    );
  }
}
