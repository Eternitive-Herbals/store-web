import { ReviewCardProps } from "@/components/ReviewCard";
import { Star, StarHalf } from "lucide-react";
import Avatar from "@/assets/bone.svg";
import { Review } from "@/models/Review";
import connectDB from "@/lib/db";
import ReviewCarousel from "./ReviewCarousel";
export default async function FeedBackSection() {
  
  await connectDB();
 
  
  // Fetch actual reviews from the database with images
  const dbReviews = await Review.find({
  image: { $exists: true, $ne: "" },
  content: { $exists: true, $ne: "" },
})
.select("author rating content image createdAt")
.sort({ createdAt: -1 })
.lean();
  const reviews: ReviewCardProps[] = dbReviews.map((r) => ({
    authorName: r.author || "Anonymous",
    authorAvatar: Avatar,
    rating: r.rating || 5,
    reviewText: r.content || "",
    image: r.image,
    location: "Verified Buyer",
  }));
  
  // Calculate dynamic stats
  const totalReviews = reviews.length;
  const avgRating = totalReviews > 0 ? (reviews.reduce((acc, curr) => acc + curr.rating, 0) / totalReviews).toFixed(1) : "0.0";
  const numRating = parseFloat(avgRating);
  return (
    <section className="relative flex h-fit md:h-dvh snap-start flex-col items-start justify-start gap-12 overflow-visible bg-[#FAF9F6] px-4 py-24 md:items-center md:justify-center">
      {/* <section className="relative flex min-h-dvh snap-start flex-col items-center justify-center gap-12  py-24"> */}
      <span className="font-comfortaa bg-white text-left text-xl font-semibold text-stone-800 sm:text-2xl md:text-3xl lg:text-4xl">
        What Our Customers Say
      </span>
      <div className="flex w-fit max-w-6xl  items-center justify-start gap-16  sm:w-full flex-row md:px-6 lg:justify-between">
        <div className="flex items-baseline-last gap-4">
          <span className="font-comforta text-4xl font-semibold text-stone-800 sm:text-6xl lg:text-8xl">
            {avgRating}
          </span>
          <span className="font-light text-stone-500 text-[.75rem] sm:text-3xl lg:text-4xl">
            {totalReviews} review{totalReviews !== 1 ? "s" : ""} with photos
          </span>
        </div>
        <div className="flex gap-1 md:gap-4 text-[#EDC06F]">
          {Array.from({ length: Math.floor(numRating) }).map((_, index) => (
            <Star key={`full-${index}`}  className="fill-[#EDC06F] size-6 sm:size-8 md:size-14 lg:size-16" />
          ))}
          {numRating % 1 !== 0 && (
            <span className="relative">
              <Star  className="size-6 sm:size-8 md:size-14 lg:size-16" />
              <StarHalf  className="absolute inset-0 fill-[#EDC06F] size-6 sm:size-8 md:size-14 lg:size-16" />
            </span>
          )}
          {Array.from({ length: 5 - Math.ceil(numRating) }).map((_, index) => (
            <Star key={`empty-${index}`} className="size-6 sm:size-8 md:size-14 lg:size-16" />
          ))}
        </div>
      </div>
      {/* Slider Carousel */}
      <ReviewCarousel reviews={reviews} />
    </section>
  );
}
