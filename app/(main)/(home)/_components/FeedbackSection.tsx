import ReviewCard, { ReviewCardProps } from "@/components/ReviewCard";
import { ArrowLeft, ArrowRight, Star, StarHalf } from "lucide-react";
import Avatar from "@/assets/bone.svg";
import { Review } from "@/models/Review";
import connectDB from "@/lib/db";

export default async function FeedBackSection() {
  await connectDB();
  
  // Fetch actual reviews from the database
  const dbReviews = await Review.find().sort({ createdAt: -1 }).lean();

  const reviews: ReviewCardProps[] = dbReviews.map((r: any) => ({
    authorName: r.author || "Anonymous",
    authorAvatar: Avatar, // Using default avatar as db doesn't store user photos
    rating: r.rating || 5,
    reviewText: r.content || "",
  }));

  // Fallback reviews if DB is empty to maintain layout
  const displayReviews = reviews.length > 0 ? reviews : [
    {
      authorName: "Palak Sachdeva",
      authorAvatar: Avatar,
      rating: 5,
      reviewText:
        "Sufficient particular impossible by reasonable oh expression is. Yet preference connection unpleasant yet melancholy but end appearance. And excellence.",
    },
    {
      authorName: "Rohiti Kumari",
      authorAvatar: Avatar,
      rating: 3.5,
      reviewText:
        "Sufficient particular impossible by reasonable oh expression is. Sufficient particular impossible by reasonable oh expression is. Yet preference connection unpleasant yet melancholy but end appearance. And excellence.",
    },
  ];

  // Split into two columns for the UI
  const leftCol = displayReviews.filter((_, i) => i % 2 === 0);
  const rightCol = displayReviews.filter((_, i) => i % 2 === 1);

  // Calculate dynamic stats
  const totalReviews = displayReviews.length;
  const avgRating = totalReviews > 0 ? (displayReviews.reduce((acc, curr) => acc + curr.rating, 0) / totalReviews).toFixed(1) : "0.0";
  const numRating = parseFloat(avgRating);

  return (
    <section className="relative flex h-dvh snap-start flex-col items-center justify-between gap-8 py-40">
      <span className="font-comfortaa text-4xl font-semibold">
        What Our Customers Say
      </span>

      <div className="flex w-full max-w-6xl items-center justify-between gap-16">
        <div className="flex items-baseline gap-4">
          <span className="font-comfortaa text-8xl font-semibold">{avgRating}</span>
          <span>{totalReviews} review{totalReviews !== 1 ? 's' : ''}</span>
        </div>
        <div className="flex gap-4 text-[#EDC06F]">
          {Array.from({ length: Math.floor(numRating) }).map((_, index) => (
            <Star key={`full-${index}`} size={64} className="fill-[#EDC06F]" />
          ))}
          {numRating % 1 !== 0 && (
            <span className="relative">
              <Star size={64} />
              <StarHalf size={64} className="absolute inset-0 fill-[#EDC06F]" />
            </span>
          )}
          {Array.from({ length: 5 - Math.ceil(numRating) }).map((_, index) => (
            <Star key={`empty-${index}`} size={64} />
          ))}
        </div>
      </div>

      <div className="relative w-full">
        <button
          type="button"
          className="absolute top-1/2 left-16 z-10 -translate-y-1/2 cursor-pointer rounded-full bg-[#E2DED3] p-2 transition-all hover:opacity-75 active:opacity-50"
        >
          <ArrowLeft size={24} className="text-[#4F5C39]" />
        </button>

        <div className="flex w-full max-w-6xl gap-8 place-self-center overflow-y-auto max-h-[45vh] scrollbar-thin scrollbar-thumb-primary-background/10 pr-2">
          <div className="flex flex-1 flex-col gap-8">
            {leftCol.map((review, index) => (
              <ReviewCard key={`left-${index}`} {...review} />
            ))}
          </div>
          <div className="flex flex-1 flex-col gap-8">
            {rightCol.map((review, index) => (
              <ReviewCard key={`right-${index}`} {...review} />
            ))}
          </div>
        </div>

        <button
          type="button"
          className="absolute top-1/2 right-16 z-10 -translate-y-1/2 cursor-pointer rounded-full bg-[#E2DED3] p-2 transition-all hover:opacity-75 active:opacity-50"
        >
          <ArrowRight size={24} className="text-[#4F5C39]" />
        </button>
      </div>
      
      <div className="flex gap-2">
        <div className="size-2 rounded-full bg-[#33556E]" />
        <div className="size-2 rounded-full bg-[#ADBBC5]" />
        <div className="size-2 rounded-full bg-[#ADBBC5]" />
        <div className="size-2 rounded-full bg-[#ADBBC5]" />
      </div>
    </section>
  );
}
