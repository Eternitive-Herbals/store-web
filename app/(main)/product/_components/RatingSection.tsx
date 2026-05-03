import React from "react";
import { Star } from "lucide-react";

type RatingSectionProps = {
  reviews: Array<{ rating: number }>;
};

export default function RatingSection({ reviews }: RatingSectionProps) {
  // Calculate average and distribution from real reviews
  const totalReviews = reviews.length;
  
  const average = totalReviews > 0
    ? Math.round((reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews) * 10) / 10
    : 0;

  // Calculate percentage for each star rating (5 → 1)
  const ratings = [5, 4, 3, 2, 1].map((star) => {
    if (totalReviews === 0) return 0;
    const count = reviews.filter((r) => r.rating === star).length;
    return Math.round((count / totalReviews) * 100);
  });

  return (
    <div className="font-sf-pro-text mx-auto h-64 w-241.75 rounded-xl bg-white p-12">
      <div className="flex gap-32">
        {/* Left */}
        <div className="flex min-w-fit flex-col items-start gap-2">
          <h2 className="pb-1 text-xl font-medium">Customer Reviews</h2>

          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={36}
                className={`pr-1${i < Math.floor(average) ? " fill-[#FFCC32] text-[#FFCC32]" : " fill-[#E5E7EB] text-[#E5E7EB]"}`}
              />
            ))}
          </div>

          <p className="text-xl font-medium">{average} out of 5</p>
          {totalReviews > 0 && (
            <p className="text-sm text-[#6A7282]">{totalReviews} review{totalReviews !== 1 ? "s" : ""}</p>
          )}
        </div>

        {/* Right */}
        <div className="font-sf-pro-text max-w-xl flex-1 space-y-3 text-[#4A5565]">
          {ratings.map((percent, i) => (
            <div key={i} className="flex items-center gap-2">
              <h2 className="font-sf-pro-text text-light 4A5565 flex w-10 space-x-1 text-sm">
                {5 - i} <p className="text-light 4A5565 px-1">star</p>
              </h2>

              <div className="h-2 flex-1 overflow-hidden rounded bg-slate-200">
                <div
                  className="h-full bg-amber-400"
                  style={{ width: `${percent}%` }}
                />
              </div>

              <h2 className="w-10 text-right text-sm">{percent}%</h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
