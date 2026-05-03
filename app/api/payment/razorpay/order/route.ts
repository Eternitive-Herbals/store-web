import { NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(req: Request) {
  try {
    const key_id = process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "";
    const key_secret = process.env.RAZORPAY_KEY_SECRET || process.env.NEXT_PUBLIC_RAZORPAY_KEY_SECRET || "";

    if (!key_id || !key_secret) {
      console.error("Razorpay keys are missing from environment variables");
      return NextResponse.json({ error: "Server configuration error: Payment keys missing" }, { status: 500 });
    }

    const razorpay = new Razorpay({
      key_id,
      key_secret,
    });

    const { amount } = await req.json();

    if (!amount || amount < 1) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }

    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100),
      currency: "INR",
      receipt: `rcpt_${Date.now()}`,
    });

    return NextResponse.json(order);
  } catch (err: unknown) {
    console.error("Razorpay order error:", err);

    return NextResponse.json(
      { error: "Order creation failed" },
      { status: 500 },
    );
  }
}
