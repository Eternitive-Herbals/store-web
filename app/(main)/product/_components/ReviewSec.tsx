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
      <div className="mx-auto flex h-fit max-h-284 w-[967px] flex-col overflow-hidden flex-wrap items-center gap-5 ">
        {reviews.map((review) => (
          <div key={review._id} className="flex h-fit w-[473px]">
            <div className="w-full rounded-2xl bg-white px-6 py-11">
              <div className="flex w-full items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="size-11 rounded-full bg-gray-600 flex items-center justify-center text-white font-bold text-lg">
                    {review.author?.charAt(0)?.toUpperCase() || "?"}
                  </div>
                  <div className="font-sf-pro-text">
                    <h2 className="text-[18px] font-bold">{review.author}</h2>
                    <h3 className="text-xs font-medium text-[#9EA1A7]">
                      {review.createdAt
                        ? new Date(review.createdAt).toLocaleDateString("en-IN", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })
                        : ""}
                    </h3>
                  </div>
                </div>
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarIcon
                      key={i}
                      size={19}
                      className={i < review.rating ? "fill-[#FFCC32] text-[#FFCC32]" : "fill-[#E5E7EB] text-[#E5E7EB]"}
                    />
                  ))}
                </div>
              </div>
              <div className="content font-sf-pro-text font-regular relative py-3 text-[15px] tracking-wide">
                <p>
                  {review.content}
                </p>
                {review.image && (
                  <div className="relative mt-3 w-full aspect-video rounded-lg overflow-hidden">
                    <Image
                      src={review.image}
                      alt="Review image"
                      fill
                      sizes="(max-width: 768px) 100vw, 500px"
                      className="object-cover"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
