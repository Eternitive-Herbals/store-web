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
    image: { $exists: true, $ne: "" }
  }).sort({ createdAt: -1 }).lean();

  const reviews: ReviewCardProps[] = dbReviews.map((r: any) => ({
    authorName: r.author || "Anonymous",
    authorAvatar: Avatar,
    rating: r.rating || 5,
    reviewText: r.content || "",
    image: r.image,
    location: "Verified Buyer",
  }));

  // Fallback reviews if DB has no image reviews to maintain layout
  const displayReviews = reviews.length > 0 ? reviews : [
    {
      authorName: "Sidharth",
      authorAvatar: Avatar,
      rating: 5,
      reviewText:
        "Sufficient particular impossible by reasonable oh expression is. Yet preference connection unpleasant yet melancholy but end appearance. And excellence.",
      image: "/reviews/review1.png",
      location: "Delhi, India",
    },
    {
      authorName: "Emily Watson",
      authorAvatar: Avatar,
      rating: 5,
      reviewText:
        "I've been using their organic face oil for over two months now, and my skin has never felt more hydrated and glowing! Highly recommend to anyone seeking natural skincare.",
      image: "/reviews/review2.png",
      location: "New York, USA",
    },
    {
      authorName: "Michael Chen",
      authorAvatar: Avatar,
      rating: 5,
      reviewText:
        "The herbal blend is incredible. It smells amazing and feels so soothing. The amber glass container keeps it fresh. Will definitely purchase again.",
      image: "/reviews/review3.png",
      location: "Toronto, Canada",
    },
  ];

  // Calculate dynamic stats
  const totalReviews = displayReviews.length;
  const avgRating = totalReviews > 0 ? (displayReviews.reduce((acc, curr) => acc + curr.rating, 0) / totalReviews).toFixed(1) : "0.0";
  const numRating = parseFloat(avgRating);

  return (
    <section className="relative flex min-h-dvh snap-start flex-col items-center justify-center gap-12 py-24 bg-[#FAF9F6] overflow-visible ">
      <span className="font-comfortaa text-4xl font-semibold text-stone-800">
        What Our Customers Say
      </span>

      <div className="flex w-full max-w-6xl items-center justify-between gap-16 px-6">
        <div className="flex items-baseline gap-4">
          <span className="font-comfortaa text-8xl font-semibold text-stone-800">{avgRating}</span>
          <span className="text-stone-500 font-light">{totalReviews} review{totalReviews !== 1 ? 's' : ''} with photos</span>
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

      {/* Slider Carousel */}
      <ReviewCarousel reviews={displayReviews} />
    </section>
  );
}
