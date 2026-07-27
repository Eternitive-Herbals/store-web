"use client"
import { Loader, Star } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import { useState } from "react";
import {motion} from "motion/react"
import defaultAvatar from "@/assets/bone.svg";
export type ReviewCardProps = {
  authorName?: string;
  author?: string;
  authorAvatar?: StaticImageData | string;
  rating: number;
  reviewText?: string;
  image?: StaticImageData | string;
  location?: string;
  createdAt?: number | string;
  content?: string;
};
export default function ReviewCard({
  authorName,
  author,
  authorAvatar,
  rating,
  reviewText,
  image,
  location,
  createdAt,
  content,
}: ReviewCardProps) {
  const [seeMore, setSeeMore] = useState(false)
  return (
    <div className="flex h-fit w-3xs shrink-0 snap-start flex-col justify-between rounded-3xl border border-stone-200/80 bg-white p-2 shadow-md shadow-stone-100/50 sm:w-[350px] md:w-[380px]">
      <div>
        {/* Header Section */}
        <div className="mb-2 flex w-full items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="relative size-12 shrink-0 overflow-hidden rounded-full bg-stone-200">
              <Image loading="lazy"
                src={authorAvatar || image || defaultAvatar}
                alt={authorName || author || "User avatar"}
                fill
                className="object-cover"
              />
            </div>
            {/* Name and Location */}
            <div className="flex flex-col">
              <span className="text-base font-bold text-[#142B3B]">
                {authorName || author}
              </span>
              <span className="text-xs font-medium text-stone-400">
                {location? location : (
                   <h3 className="text-xs font-medium text-[#9EA1A7]">
                      {createdAt
                      ? new Date(createdAt).toLocaleDateString("en-IN", {
                             year: "numeric",
                            month: "short",
                            day: "numeric",
                          })
                        : ""}
                   </h3>
                )}
              </span>
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
        <motion.p
          className={`${seeMore ? "line-clamp-none" : "line-clamp-2"}  text-sm leading-relaxed font-normal text-stone-700`}
        >
          {reviewText || content}
        </motion.p>
        <button className="text-blue-500 text-xs font-light" onClick={() => setSeeMore(!seeMore)}>
          {seeMore ? "less -" : "See more +"}
        </button>
      </div>
      {/* Review Image */}
      {image ? (
        <div className="relative mt-1 h-[110px] w-full shrink-0 overflow-hidden rounded-2xl bg-stone-50">
          <Image loading="lazy"
            src={image}
            alt="Customer review photo"
            fill
            className="mx-auto h-full w-full object-cover"
          />
        </div>
      ) : (
        <div className="relative h-[110px] w-full shrink-0 overflow-hidden rounded-2xl bg-stone-50">
          <Loader h-32 w-32 />
        </div>
      )}
    </div>
  );
}
