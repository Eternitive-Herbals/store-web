"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";

type Slide = {
  name: string;
  href: string;
};

const Slider = ({ slides }: { slides: Slide[] }) => {
  if (!slides || slides.length === 0) return null;

  const extendedSlides = [slides[slides.length - 1], ...slides, slides[0]];

  const [slideIdx, setSlideIdx] = useState(1);
  const [isTransition, setIsTransition] = useState(true);

  const next = () => {
    setSlideIdx((prev) => prev + 1);
  };

  const prev = () => {
    setSlideIdx((prev) => prev - 1);
  };

  useEffect(() => {
    if (!isTransition) {
      requestAnimationFrame(() => {
        setIsTransition(true);
      });
    }
  }, [isTransition]);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <div
        className={`flex ${
          isTransition
            ? "transition-transform duration-1000 ease-in-out"
            : "transition-none"
        }`}
        style={{ transform: `translateX(-${slideIdx * 100}%)` }}
        onTransitionEnd={() => {
          if (slideIdx === extendedSlides.length - 1) {
            setIsTransition(false);
            setSlideIdx(1);
          }

          if (slideIdx === 0) {
            setIsTransition(false);
            setSlideIdx(slides.length);
          }
        }}
      >
        {extendedSlides.map((slide, idx) => (
          <div key={idx} className="relative h-screen min-w-full">
            <Image
              src={slide.href}
              alt={slide.name}
              fill
              className="object-cover"
              priority={idx === 1}
            />
          </div>
        ))}
      </div>

      <div className="absolute inset-0 flex items-center justify-between px-8">
        <button
          onClick={prev}
          className="rounded-full bg-white/60 p-2 hover:bg-white/90"
        >
          <ArrowLeft />
        </button>
        <button
          onClick={next}
          className="rounded-full bg-white/60 p-2 hover:bg-white/90"
        >
          <ArrowRight />
        </button>
      </div>
    </div>
  );
};

export default Slider;
