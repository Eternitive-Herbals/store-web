import ReviewCard, { ReviewCardProps } from "@/components/ReviewCard";
import { ArrowLeft, ArrowRight, Star, StarHalf } from "lucide-react";
import Avatar from "@/assets/bone.svg";

export default function FeedBackSection() {
  const reviews: ReviewCardProps[] = [
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
        "Sufficient particular impossible by reasonable oh expression is. Yet preference connection unpleasant yet melancholy but end appearance. And excellence.",
    },
  ];

  return (
    <section className="relative flex h-dvh snap-start flex-col items-center justify-between gap-8 py-40">
      <span className="font-comfortaa text-4xl font-semibold">
        What Our Customers Say
      </span>

      <div className="flex w-full max-w-6xl items-center justify-between gap-16">
        <div className="flex items-baseline gap-4">
          <span className="font-comfortaa text-8xl font-semibold">4.5</span>
          <span>2134 reviews</span>
        </div>
        <div className="flex gap-4 text-[#EDC06F]">
          <Star size={64} className="fill-[#EDC06F]" />
          <Star size={64} className="fill-[#EDC06F]" />
          <Star size={64} className="fill-[#EDC06F]" />
          <Star size={64} className="fill-[#EDC06F]" />
          <span className="relative">
            <Star size={64} />
            <StarHalf size={64} className="absolute inset-0 fill-[#EDC06F]" />
          </span>
        </div>
      </div>

      <div className="relative w-full">
        <button
          type="button"
          className="absolute top-1/2 left-16 z-10 -translate-y-1/2 cursor-pointer rounded-full bg-[#E2DED3] p-2 transition-all hover:opacity-75 active:opacity-50"
        >
          <ArrowLeft size={24} className="text-[#4F5C39]" />
        </button>

        <div className="flex w-full max-w-6xl gap-8 place-self-center">
          <div className="flex flex-1 flex-col gap-8">
            {reviews.map((review, index) => (
              <ReviewCard key={index} {...review} />
            ))}
          </div>
          <div className="flex flex-1 flex-col gap-8">
            {reviews.map((review, index) => (
              <ReviewCard key={index} {...review} />
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
    </section>
  );
}
