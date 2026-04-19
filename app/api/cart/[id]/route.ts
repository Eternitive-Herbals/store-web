import connectDB from "@/lib/db";
import { Cart } from "@/models/Cart";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    await connectDB();
    const { id } = await params;

    const { quantity } = await req.json();

    if (quantity === undefined) {
      return NextResponse.json(
        { message: "All Fields required" },
        { status: 400 },
      );
    }

    if (typeof quantity !== "number") {
      return NextResponse.json(
        { message: "Invalid quantity" },
        { status: 400 },
      );
    }

    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(
      token,
      process.env.SECRET_AETHERY!,
    ) as JwtPayload;
    const userId = decoded.userId;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return NextResponse.json({ message: "Cart not found" }, { status: 404 });
    }

    const itemIndex = cart.items.findIndex(
      (item: any) => item._id.toString() === id,
    );

    if (itemIndex === -1) {
      return NextResponse.json({ message: "Item not found" }, { status: 404 });
    }

   
    if (quantity <= 0) {
      
      cart.items.splice(itemIndex, 1);
    } else {
      cart.items[itemIndex].quantity = quantity;
    }

    await cart.save();

    return NextResponse.json({
      cart: cart?.items || [],
    });
  } catch (error) {
    console.log("Cart PUT Error:", error);

    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }:  { params: { id: string } } ,
) {
  try {
    await connectDB();
    const { id } = await params;
    const productId = id;

    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;

    if (!token) {
      return NextResponse.json({ message: "unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(
      token,
      process.env.SECRET_AETHERY!,
    ) as JwtPayload;
    const userId = decoded.userId;

    if (!productId) {
      return NextResponse.json(
        { message: "productId is required" },
        { status: 400 },
      );
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return NextResponse.json({ message: "unauthorized" }, { status: 404 });
    }

    const itemIndex = cart.items.findIndex(
      (item: any) => item._id.toString() === productId,
    );

    if (itemIndex === -1) {
      return NextResponse.json({ message: "Item not found" }, { status: 404 });
    }

    cart.items.splice(itemIndex, 1);

    await cart.save();

    return NextResponse.json({
      cart: cart?.items || [],
    });
  } catch (error) {
    console.log("Cart DELETE Error:", error);

    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
