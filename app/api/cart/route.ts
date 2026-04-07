import connectDB from "@/lib/db";
import { Cart } from "@/models/Cart";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

function getUserId(token: string): string | null {
  try {
    const decoded: any = jwt.verify(token, process.env.SECRET_AETHERY!);
    return decoded.userId;
  } catch {
    return null;
  }
}


export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;
    if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const userId = getUserId(token);
    if (!userId) return NextResponse.json({ message: "Invalid token" }, { status: 401 });

    const { productId } = await req.json();
    if (!productId) return NextResponse.json({ message: "productId is required" }, { status: 400 });

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = await Cart.create({
        userId,
        items: [{ product: productId, quantity: 1 }],
      });
    } else {
      const existingItem = cart.items.find(
        (item: any) => item.product.toString() === productId
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.items.push({ product: productId, quantity: 1 });
      }

      await cart.save();
    }

    return NextResponse.json({ message: "Product added to cart", cart }, { status: 200 });
  } catch (error) {
    console.log("Cart POST Error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}


export async function GET() {
  try {
    await connectDB();

    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;
    if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const userId = getUserId(token);
    if (!userId) return NextResponse.json({ message: "Invalid token" }, { status: 401 });

    const cart = await Cart.findOne({ userId }).populate("items.product");

    return NextResponse.json({ cart: cart?.items || [] }, { status: 200 });
  } catch (error) {
    console.log("Cart GET Error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}


export async function PUT(req: NextRequest) {
  try {
    await connectDB();

    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;
    if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const userId = getUserId(token);
    if (!userId) return NextResponse.json({ message: "Invalid token" }, { status: 401 });

    const { productId, quantity } = await req.json();
    if (!productId) return NextResponse.json({ message: "productId is required" }, { status: 400 });

    const cart = await Cart.findOne({ userId });
    if (!cart) return NextResponse.json({ message: "Cart not found" }, { status: 404 });

    const item = cart.items.find(
      (item: any) => item.product.toString() === productId
    );
    if (!item) return NextResponse.json({ message: "Item not found" }, { status: 404 });

    if (quantity <= 0) {
      
      const index = cart.items.findIndex(
        (item: any) => item.product.toString() === productId
      );
      if (index !== -1) cart.items.splice(index, 1);
    } else {
      item.quantity = quantity;
    }

    await cart.save();
    return NextResponse.json({ message: "Cart updated", cart }, { status: 200 });
  } catch (error) {
    console.log("Cart PUT Error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}


export async function DELETE(req: NextRequest) {
  try {
    await connectDB();

    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;
    if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const userId = getUserId(token);
    if (!userId) return NextResponse.json({ message: "Invalid token" }, { status: 401 });

    const { productId } = await req.json();
    if (!productId) return NextResponse.json({ message: "productId is required" }, { status: 400 });

    const cart = await Cart.findOne({ userId });
    if (!cart) return NextResponse.json({ message: "Cart not found" }, { status: 404 });

    
    const index = cart.items.findIndex(
      (item: any) => item.product.toString() === productId
    );
    if (index === -1) return NextResponse.json({ message: "Item not found" }, { status: 404 });

    cart.items.splice(index, 1);
    await cart.save();

    return NextResponse.json({ message: "Item removed from cart", cart }, { status: 200 });
  } catch (error) {
    console.log("Cart DELETE Error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}