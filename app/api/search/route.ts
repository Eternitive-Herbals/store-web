import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { Product } from "@/models/Product";
import { Ingredients } from "@/models/Ingredient";
import { Category } from "@/models/Category";
import { Goal } from "@/models/Goal";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query");

    const filter: any = {};

    if (query) {
      const ingredientDocs = await Ingredients.find({
        name: {
          $regex: query.split(/[\s-]/).join(".*"),
          $options: "i",
        },
      });

      const categoryDocs = await Category.find({
        name: {
          $regex: query.split(/[\s-]/).join(".*"),
          $options: "i",
        },
      });

      const goalDocs = await Goal.find({
        name: {
          $regex: query.split(/[\s-]/).join(".*"),
          $options: "i",
        },
      });

      filter.$or = [
        { name: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
        {
          ingredients: {
            $in: ingredientDocs.map((i) => i._id),
          },
        },
        {
          type: {
            $in: categoryDocs.map((i) => i._id),
          },
        },
        {
          goal: {
            $in: goalDocs.map((i) => i._id),
          },
        },
      ];
    }

    const products = await Product.find(filter)
      .populate("ingredients")
      .populate("type")
      .populate("goal");

    return NextResponse.json({ products: products || [] }, { status: 200 });
  } catch (error) {
    console.log("Search error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
