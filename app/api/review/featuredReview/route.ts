
import {NextResponse, NextRequest} from "next/server"
import connectDB from "@/lib/db";
import { Review } from "@/models/Review";
export async function GET(req: NextRequest) {
    try{

        await connectDB()

        const featuredReviews = await Review.find().sort({createdAt:-1}).limit(10).lean();

        return NextResponse.json(featuredReviews);


    }
    catch (err){
        console.log("There is an error occured while fetching the featured reviews", err)

        return NextResponse.json({message:"THere is an error occured while fetching the featured reviews"},{status: 500})
    }
}