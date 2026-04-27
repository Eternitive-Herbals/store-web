import connectDB from "@/lib/db";
import { Ingredients } from "@/models/Ingredient";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";

export async function PUT(req: NextRequest,   { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await  params
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    if (decoded.role !== "Admin"){ return NextResponse.json({ message: "Forbidden" }, { status: 403 });}


    const {name , description , image} = await req.json();
   

    const updateIngredient:any  = {};

    if(name){
      if(typeof name !== "string"){
        return NextResponse.json({message: "invalid input"}, {status: 400})
      }
      updateIngredient.name = name;
    }
     if (image) {
       if (typeof image !== "string") {
         return NextResponse.json(
           { message: "invalid input" },
           { status: 400 },

         );
       }
       updateIngredient.image = image;
     }
      if (description) {
        if (typeof description !== "string") {
          return NextResponse.json(
            { message: "invalid input" },
            { status: 400 },
          );

        }
        updateIngredient.description = description;
      }


      if(Object.keys(updateIngredient).length === 0)
      {return NextResponse.json({message:"Invalid Input"}, {status: 400})}



    const ingredient = await Ingredients.findByIdAndUpdate(id, updateIngredient, { new: true , runValidators: true,});

    if (!ingredient) {
      return NextResponse.json({ message: "Ingredient not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Ingredient updated", ingredient }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Something went wrong",error }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;

    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as JwtPayload;

    if (decoded.role !== "Admin") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const ingredient = await Ingredients.findByIdAndDelete(id);

    if (!ingredient) {
      return NextResponse.json({ message: "Ingredient not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Ingredient deleted", ingredient },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong", error },
      { status: 500 }
    );
  }
}