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

    const name = searchParams.get("name");
    const description = searchParams.get("description");
    const ingredients = searchParams.get("ingredients");
    const price = searchParams.get("price");
    const type = searchParams.get("type");
    const dosage = searchParams.get("dosage");
    const goal = searchParams.get("goal");

    const filter: any = {};

    if (name) {
      filter.name = name;
    }

    if (description) {
      filter.description = description;
    }

    if (ingredients) {
      const ingredientDocs = await Ingredients.find({
        name: { $regex: ingredients, $options: "i" },
      });

      if (ingredientDocs.length === 0) {
        return NextResponse.json(
          { message: "Ingredient not found" },
          { status: 404 },
        );
      }

      filter.ingredients = {
        $in: ingredientDocs.map((i) => i._id),
      };
    }

    if (price) {
      filter.price = Number(price);
    }

    if (type) {
      const typeDocs = await Category.find({
        name: { $regex: type, $options: "i" },
      });

      if (typeDocs.length === 0) {
        return NextResponse.json(
          { message: "Type not found" },
          { status: 404 },
        );
      }

      filter.type = {
        $in: typeDocs.map((i) => i._id),
      };
    }

    if (dosage) {
      filter.dosage = dosage;
    }

    if (goal) {
      const goalDocs = await Goal.find({
        $name: { $regex: goal, $options: "i" },
      });

      if (goalDocs.length === 0) {
        return NextResponse.json({ error: "Goal Not Found" }, { status: 404 });
      }

      filter.goal = {
        $in: goalDocs.map((i) => i._id),
      };
    }

    const products = await Product.find(filter);

    if (products.length === 0) {
      return NextResponse.json(
        {
          message: "Products not found",
        },
        { status: 404 },
      );
    }
    return NextResponse.json(
      {
        message: "Products fetched successfully",
        products,
      },
      { status: 200 },
    );
  } catch (error) {
    console.log("Some Unexpected Error Occurs", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
