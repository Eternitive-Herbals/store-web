import connectDB from "@/lib/db";
import { Blogs } from "@/models/Blog";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;

    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized - No token" },
        { status: 401 },
      );
    }

    let decoded;

    try {
      decoded = jwt.verify(
        token,
        process.env.SECRET_AETHERY!,
      ) as jwt.JwtPayload & { role: string };
    } catch (err) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    if (decoded.role !== "Admin") {
      return NextResponse.json({ error: "Admins only" }, { status: 403 });
    }

    const { title, content, image } = await req.json();

    if (!title || !content || !image) {
      return NextResponse.json(
        { error: "All fields required" },
        { status: 400 },
      );
    }

    await connectDB();

    const blog = await Blogs.create({ title, content, image });

    return NextResponse.json(blog, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    await connectDB();
    const blogs = await Blogs.find().sort();
    return NextResponse.json(blogs, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
