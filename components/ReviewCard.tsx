import { Star } from "lucide-react";
import Image, { StaticImageData } from "next/image";

export type ReviewCardProps = {
  authorName: string;
  authorAvatar: StaticImageData | string;
  rating: number;
  reviewText: string;
  image?: string;
  location?: string;
};

export default function ReviewCard({
  authorName,
  authorAvatar,
  rating,
  reviewText,
  image,
  location,
}: ReviewCardProps) {
  return (
    <div className="flex flex-col w-[300px] sm:w-[350px] md:w-[380px] h-fit rounded-3xl bg-white border border-stone-200/80 p-6 shadow-md shadow-stone-100/50 snap-start shrink-0 justify-between">
      <div>
        {/* Header Section */}
        <div className="flex items-center justify-between w-full mb-4">
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="relative size-12 rounded-full overflow-hidden bg-stone-200 shrink-0">
              <Image
                src={authorAvatar}
                alt={authorName}
                fill
                className="object-cover"
              />
            </div>
            {/* Name and Location */}
            <div className="flex flex-col">
              <span className="text-base font-bold text-[#142B3B]">{authorName}</span>
              <span className="text-xs text-stone-400 font-medium">{location || "Delhi, India"}</span>
            </div>
          </div>

          {/* Rating Stars */}
          <div className="flex gap-0.5 text-[#EDC06F]">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                size={14}
                className={
                  index < Math.floor(rating)
                    ? "fill-[#EDC06F] text-[#EDC06F]"
                    : "text-stone-200"
                }
              />
            ))}
          </div>
        </div>

        {/* Review Text */}
        <p className="text-stone-700 text-sm leading-relaxed line-clamp-4 font-normal">
          {reviewText}
        </p>
      </div>

      {/* Review Image */}
      {image && (
        <div className="relative w-full h-[220px] rounded-2xl overflow-hidden bg-stone-50 shrink-0">
          <Image
            src={image}
            alt="Customer review photo"
            fill
            sizes="(max-width: 768px) 100vw, 380px"
            className="object-cover"
          />
        </div>
      )}
    </div>
  );
}
