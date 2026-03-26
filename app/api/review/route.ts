import connectDB from "@/lib/db";
import { Review } from "@/models/Review";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);

    const author = searchParams.get("author");
    const rating = searchParams.get("rating");
    const image = searchParams.get("image");

    const filter: any = {};

    if (author) {
      filter.author = author;
    }
    if (rating) {
      filter.rating = rating;
    }
    if (image === "true") {
      filter.image = { $ne: "" };
    }
    if (image === "false") {
      filter.$or = [
        { image: "" },
        { image: { $exists: "false" } },
        { image: null },
      ];
    }

    const reviews = await Review.find(filter);
    if (reviews.length === 0) {
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
      { status: 200 },
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

    const { author, rating, content, image } = await req.json();

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
      image,
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
