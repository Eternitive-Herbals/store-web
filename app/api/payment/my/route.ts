import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { getUserFromRequest } from "@/lib/getUserFromRequest";
import { Transaction } from "@/models/Transaction";

export async function GET() {
  try {
    await connectDB();

    const user = await getUserFromRequest();

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    const payments = await Transaction.find({ user: user._id })
      .sort({ createdAt: -1 })
      .lean();

    const totalPayments = payments.length;
    const totalSpent = payments.reduce((sum, p) => sum + (p.amount || 0), 0);

    return NextResponse.json({
      success: true,
      payments,
      totalPayments,
      totalSpent,
    });
  } catch (error) {
    console.error("PAYMENT MY ERROR:", error);

    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 },
    );
  }
}
