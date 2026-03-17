import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { Transaction } from "@/models/Transaction";
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

    const { orderId, amount, paymentMethod } = await req.json();

    const payment = await Transaction.create({
      order: orderId,
      user: userId,
      amount,
      paymentMethod,
    });

    return NextResponse.json(
      { message: "Payment created", payment },
      { status: 201 },
    );
  } catch (error) {
    console.log("Payment creation error:", error);

    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const orderId = searchParams.get("orderId");

    const payment = await Transaction.findOne({ order: orderId });

    return NextResponse.json(payment);
  } catch (error) {
    console.log("Payment error:", error);

    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
