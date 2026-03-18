import connectDB from "@/lib/db";
import { Review } from "@/models/Review";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const reviews = await Review.find();
    if (!reviews) {
      return NextResponse.json(
        {
          message: "Reviews not found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        message: "Reviews fetched successfully",
        reviews,
      },
      { status: 201 },
    );
  } catch (error) {
    console.log("Reviews can't be fetched", error);

    return NextResponse.json(
      {
        message: "Reviews can not be fetched something went wrong",
      },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { author, rating, content } = await req.json();

    if (!author || !rating || !content) {
      return NextResponse.json(
        {
          message: "All Fields required",
        },
        { status: 400 },
      );
    }

    const review = await Review.create({
      author,
      rating,
      content,
    });

    return NextResponse.json(
      {
        message: "Review is created",
        review,
      },
      { status: 201 },
    );
  } catch (error) {
    console.log("Review can't be created", error);

    return NextResponse.json(
      {
        message: "Review can not be created something went wrong",
      },
      { status: 500 },
    );
  }
}
