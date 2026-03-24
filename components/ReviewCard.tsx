import { Star, StarHalf } from "lucide-react";
import Image, { StaticImageData } from "next/image";

export type ReviewCardProps = {
  authorName: string;
  authorAvatar: StaticImageData;
  rating: number;
  reviewText: string;
};

export default function ReviewCard({
  authorName,
  authorAvatar,
  rating,
  reviewText,
}: ReviewCardProps) {
  return (
    <div className="shadow-foreground/15 flex h-48 flex-col gap-4 rounded-xl border-2 border-[#AE8363]/50 bg-white p-6 shadow-2xl">
      <div className="flex items-center gap-4">
        <div className="relative size-12">
          <Image
            src={authorAvatar}
            alt="User Avatar"
            fill
            className="object-cover"
          />
        </div>
        <span className="text-lg font-bold">{authorName}</span>
        <div className="ml-auto flex gap-0.5 text-[#EDC06F]">
          {Array.from({ length: Math.floor(rating) }).map((_, index) => (
            <Star key={index} size={18} className="fill-[#EDC06F]" />
          ))}
          {rating % 1 !== 0 && (
            <span className="relative">
              <StarHalf size={18} className="absolute inset-0 fill-[#EDC06F]" />
              <Star size={18} />
            </span>
          )}
          {Array.from({ length: 5 - Math.ceil(rating) }).map((_, index) => (
            <Star key={index} size={18} />
          ))}
        </div>
      </div>

      <p className="line-clamp-3">{reviewText}</p>
    </div>
  );
}
