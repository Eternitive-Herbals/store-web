import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { Order } from "@/models/Order";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/token";
import "@/models/User";
import "@/models/Product";
 
export async function GET(req: NextRequest) {
  try { 
    await connectDB();
    
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const decoded = verifyToken(token);

    if (decoded.role !== "Admin") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");

    const query: any = {};
    if (status) {
      query["items.status"] = status;
    }

    const orders = await Order.find(query)
      .populate("user", "username email")
      .populate("items.product", "name price image")
      .sort({ createdAt: -1 });

    return NextResponse.json({ orders }, { status: 200 });
  } catch (error) {
    console.error("Order GET Error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
