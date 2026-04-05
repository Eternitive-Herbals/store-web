import { Contact } from "@/models/Contact";
import connectDB from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, email, phonenumber, message } = await req.json();

    if (!name || !message) {
      return NextResponse.json(
        { error: "Name and message required" },
        { status: 400 },
      );
    }
    if (!email && !phonenumber) {
      return Response.json(
        { error: "Either email or phone number is required" },
        { status: 400 },
      );
    }
    await connectDB();
    const contact = await Contact.create({ name, email, phonenumber, message });
    return NextResponse.json(contact, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
