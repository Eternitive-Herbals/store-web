import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { getUserFromRequest } from "@/lib/getUserFromRequest";
import { Transaction } from "@/models/Transaction";

export async function POST(req: Request) {
  try {
    await connectDB();

    const loggedInUser = await getUserFromRequest();

    const body = await req.json();
    const { userId, totalAmount, paymentMethod, order } = body;

    const finalUserId = loggedInUser?._id || userId;

    if (!finalUserId) {
      return NextResponse.json(
        { success: false, message: "User not provided" },
        { status: 400 },
      );
    }

    if (!totalAmount) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 },
      );
    }

    const payment = await Transaction.create({
      user: finalUserId,
      amount: totalAmount,
      paymentMethod: paymentMethod,
      order,
    });

    return NextResponse.json({
      success: true,
      payment,
    });
  } catch (error) {
    console.error("CREATE PAYMENT ERROR:", error);

    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 },
    );
  }
}
