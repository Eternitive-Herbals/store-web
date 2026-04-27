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

    const goals = searchParams.get("goals");
    const categories = searchParams.get("categories");

    const filter: any = {};
    const sortBy = searchParams.get("sortBy");

    let sortOption: any = {};

    switch (sortBy) {
      case "price_low_high":
        sortOption = { price: 1 };
        break;

      case "price_high_low":
        sortOption = { price: -1 };
        break;

      case "best_selling":
        sortOption = { orders: -1 };
        break;

      case "featured":
      default:
        sortOption = { createdAt: -1 };
    }
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
          category: {
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

    if (goals) {
      const goalArray = goals.split(",");

      const goalDocs = await Goal.find({
        name: { $in: goalArray },
      });

      if (goalDocs.length > 0) {
        filter.goal = {
          $in: goalDocs.map((g) => g._id),
        };
      }
    }

    if (categories) {
      const categoryArray = categories.split(",");

      const categoryDocs = await Category.find({
        name: { $in: categoryArray },
      });

      if (categoryDocs.length > 0) {
        filter.category = {
          $in: categoryDocs.map((c) => c._id),
        };
      }
    }

    const products = await Product.find(filter)
      .sort(sortOption)
      .populate("ingredients")
      .populate("category")
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
