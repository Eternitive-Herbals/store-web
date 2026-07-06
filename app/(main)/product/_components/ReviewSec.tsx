import ReviewCard from "@/components/ReviewCard";
import { StarIcon } from "lucide-react";
import Image from "next/image";

type ReviewSecProps = {
  reviews: Array<{
    _id: string;
    author: string;
    rating: number;
    content: string;
    image?: string;
    createdAt?: string;
  }>;
};

export default function ReviewSec({ reviews }: ReviewSecProps) {
  if (reviews.length === 0) {
    return (
      <div className="w-full p-9 mt-14">
        <div className="text-center py-16">
          <p className="text-[#9EA1A7] text-lg">No reviews yet. Be the first to review this product!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full p-9 mt-14">
      <div className="mx-auto flex h-fit max-h-284 w-[967px] flex-row overflow-hidden flex-wrap  items-start gap-5 ">
        {reviews.map((review,idx) => (
          <ReviewCard key={idx} {...review}/>
         
        ))}
      </div>
    </div>
  );
}
