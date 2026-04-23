import React from 'react'
import Image from 'next/image'
import ReviewSec from './ReviewSec'
import RatingSection from './RatingSection'
import BackgroundTexture from "@/assets/background-texture-brown-long-1.svg";
import CreateReview from './CreateReview';
import FooterElementalIcons from "@/assets/footer-elemental-icons.svg";
export default function Rating_Review_section() {
  return (
    <section className="min-h-screen-2 relative flex snap-start flex-col items-center gap-16 px-24 py-48">
      <Image
        src={BackgroundTexture}
        alt="Background Texture"
        fill
        className="-z-10 object-cover opacity-5"
      />

      <span className="font-comfortaa mb-16 text-4xl font-bold">
        Listen from our customers
      </span>
      <div className="w-[965px]">
        <RatingSection />

        <CreateReview />
        <Image
          src={FooterElementalIcons}
          alt="Elemental Icons"
          className="mx-auto"
        />
        <ReviewSec />
      </div>
    </section>
  );
}
