import { NextRequest, NextResponse } from "next/server";
import { PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3 } from "@/lib/s3"; 
import { v4 as uuidv4 } from "uuid";

export async function POST(req: NextRequest) {
  try {
    const { fileType } = await req.json(); 
    if (!fileType.startsWith("image/")) {
      return NextResponse.json(
        { error: "Only images allowed" },
        { status: 400 },
      );
    }
    const fileName = `${uuidv4()}`;
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileName,
      ContentType: fileType,
    });   
    const signedUrl = await getSignedUrl(s3, command, {
      expiresIn: 60, 
    });
    const fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;

    return NextResponse.json({
      signedUrl,
      fileUrl,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
   
      { error: "Failed to generate signed URL" },
      { status: 500 },
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { fileUrl } = await req.json();

    if (!fileUrl) {
      return NextResponse.json(
        { error: "File URL is required" },
        { status: 400 }
      );
    }

    const urlParts = fileUrl.split("/");
    const fileName = urlParts[urlParts.length - 1];

    const command = new DeleteObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileName,
    });

    await s3.send(command);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to delete image" },
      { status: 500 }
    );
  }
}
