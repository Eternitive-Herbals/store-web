"use client";
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import ReviewSec from './ReviewSec'
import RatingSection from './RatingSection'
import BackgroundTexture from "@/assets/background-texture-brown-long-1.svg";
import CreateReview from './CreateReview';
import FooterElementalIcons from "@/assets/footer-elemental-icons.svg";
import { getProductReviews } from '@/lib/reviewAction';
type Props = {
  productId: string;
};
export default function Rating_Review_section({ productId }: Props) {
  const [reviews, setReviews] = useState<any[]>([]);
  const fetchReviews = async () => {
    const data = await getProductReviews(productId);
    setReviews(data);
  };
  useEffect(() => {
    fetchReviews();
  }, [productId]);
  return (
    <section className="min-h-screen-2 relative flex snap-start flex-col items-center gapt-4sm:gap-16 p-10 md:px-24 md:py-48">
      <Image loading="lazy"
        src={BackgroundTexture}
        alt="Background Texture"
        fill
        sizes="100vw"
        className="-z-10 object-cover opacity-5"
      />
      <span className="font-comfortaa mb-16 sm:text-2xl text-xl md:text-4xl font-bold">
        Listen from our customers
      </span>
      <div className="flex w-full flex-col items-center gap-16">
        <RatingSection reviews={reviews} />
        <CreateReview productId={productId} onReviewCreated={fetchReviews} />
        <Image loading="lazy"
          src={FooterElementalIcons}
          alt="Elemental Icons"
          className="mx-auto"
        />
        <ReviewSec reviews={reviews} />
      </div>
    </section>
  );
}
