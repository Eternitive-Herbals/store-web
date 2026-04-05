import connectDB from "@/lib/db";
import { Cart } from "@/models/Cart";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();

    const { title, price, image, description } = body;

    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const decoded: any = jwt.verify(token, process.env.SECRET_AETHERY!);
    const userId = decoded.userId;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = await Cart.create({
        userId,
        items: [
          { title, price: Number(price), image, description, quantity: 1 },
        ],
      });
    } else {
      const existingItem = cart.items.find((item: any) => item.title === title);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.items.push({
          title,
          price: Number(price),
          image,
          description,
          quantity: 1,
        });
      }

      await cart.save();
    }

    return NextResponse.json({
      message: "Product added to cart",
      cart,
    });
  } catch (error) {
    console.log("Cart Error:", error);

    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
export async function GET() {
  try {
    await connectDB();

    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const decoded: any = jwt.verify(token, process.env.SECRET_AETHERY!);
    const userId = decoded.userId;

    const cart = await Cart.findOne({ userId });

    return NextResponse.json({
      cart: cart?.items || [],
    });
  } catch (error) {
    console.log("Cart fetch error:", error);

    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();
    const { productId, quantity } = body;

    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const decoded: any = jwt.verify(token, process.env.SECRET_AETHERY!);
    const userId = decoded.userId;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return NextResponse.json({ message: "Cart not found" }, { status: 404 });
    }

    const itemIndex = cart.items.findIndex(
      (item: any) => item._id.toString() === productId,
    );

    if (itemIndex === -1) {
      return NextResponse.json({ message: "Item not found" }, { status: 404 });
    }

    // 🔥 Update quantity logic
    if (quantity <= 0) {
      // remove item
      cart.items.splice(itemIndex, 1);
    } else {
      cart.items[itemIndex].quantity = quantity;
    }

    await cart.save();

    return NextResponse.json({
      message: "Cart updated successfully",
      cart,
    });
  } catch (error) {
    console.log("Cart PUT Error:", error);

    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  await connectDB();

  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  if (!token) {
    return NextResponse.json({ message: "unauthorized" }, { status: 401 });
  }

  const decoded: any = jwt.verify(token, process.env.SECRET_AETHERY!);
  const userId = decoded.userId;

  const body = await req.json();

  const cart = await Cart.findOne({ userId });
  if (!cart) {
    return NextResponse.json({ message: "unauthorized" }, { status: 404 });
  }

  cart.items = cart.items.filter((item: any) => item.title !== body.title);

  await cart.save();

  return NextResponse.json({
    message: "Item Removed from Cart",
    cart,
  });
}
