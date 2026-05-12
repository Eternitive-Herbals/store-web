"use client";

import SampleImage1 from "@/assets/product-sample-image-1.png";
import SampleImage2 from "@/assets/prod2.png";
import SampleImage3 from "@/assets/prod3.png";
import SampleImage4 from "@/assets/BgImage.jpg";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

export default function CarouselSection() {
  const images = [SampleImage1, SampleImage2, SampleImage3, SampleImage4];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
    }),
    center: {
      x: "0%",
    },
    exit: (direction: number) => ({
      x: direction < 0 ? "100%" : "-100%",
    }),
  };

  useEffect(() => {
    if (isPaused) {
      return;
    }

    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 7000);

    return () => clearInterval(timer);
  }, [currentIndex, images.length, isPaused]);

  function handleNext() {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }

  function handlePrev() {
    setDirection(-1);
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length,
    );
  }

  function togglePause() {
    if (isPaused) {
      setDirection(1);
      setIsPaused(false);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      return;
    }
    setIsPaused(true);
  }

  function handleImageButton(index: number) {
    if (index > currentIndex) {
      setDirection(1);
      setCurrentIndex(index);
      return;
    }
    if (index < currentIndex) {
      setDirection(-1);
      setCurrentIndex(index);
      return;
    }
  }

  return (
    <div className="bg-foreground relative flex h-dvh snap-start">
      <button
        type="button"
        onClick={handlePrev}
        className="absolute top-1/2 left-16 z-10 -translate-y-1/2 cursor-pointer rounded-full bg-[#E2DED3] p-2 transition-all hover:opacity-75 active:opacity-50"
      >
        <ArrowLeft size={24} className="text-[#4F5C39]" />
      </button>

      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="absolute inset-0 h-full w-full"
        >
          <Image
            src={images[currentIndex]}
            alt="cta image"
            fill
            sizes="100vw"
            className="pointer-events-none object-cover"
            unoptimized
          />
        </motion.div>
      </AnimatePresence>

      <div className="bg-foreground/66 absolute bottom-12 left-20 z-10 flex h-40 w-3xl flex-col justify-between rounded-2xl border border-white/10 px-6 py-4 text-white backdrop-blur-2xl transition-all">
        <AnimatePresence initial={false}>
          <motion.span className="font-comfortaa text-[2.5rem]">
            Immunohigh
          </motion.span>
        </AnimatePresence>
        <AnimatePresence initial={false}>
          <motion.p className="text-2xl font-light">
            Supports your body&apos;s natural immune defence to help you stay
            protected every day.
          </motion.p>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-8 left-20 z-10 flex h-2 w-3xl gap-2 rounded-full p-0.5">
        {Array.from({ length: images.length }).map((_, index) => (
          <button
            key={index}
            onClick={() => handleImageButton(index)}
            className="bg-foreground/66 min-h-full flex-1 cursor-pointer overflow-hidden rounded-full"
          >
            {currentIndex === index &&
              (isPaused ? (
                <div className="bg-background min-h-full min-w-full" />
              ) : (
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 7, ease: "linear" }}
                  className="bg-background min-h-full"
                />
              ))}
          </button>
        ))}
      </div>

      <div className="absolute right-28 bottom-12 z-10 flex gap-4">
        <button
          type="button"
          onClick={togglePause}
          className="bg-foreground/66 cursor-pointer rounded-2xl border border-white/10 p-4 text-white backdrop-blur-2xl transition-all hover:opacity-75 active:opacity-50"
        >
          {isPaused ? (
            <Play size={20} className="fill-white" />
          ) : (
            <Pause size={20} className="fill-white" />
          )}
        </button>

        <Link
          href={"/product/alskdjfhlkajsdhflkajsdf"}
          className="bg-foreground/66 flex items-center gap-2 rounded-2xl border border-white/10 px-6 py-2 text-white backdrop-blur-2xl transition-all hover:opacity-75 active:opacity-50"
        >
          <span className="text-2xl">View Product</span>
          <ArrowRight size={24} />
        </Link>
      </div>

      <button
        type="button"
        onClick={handleNext}
        className="absolute top-1/2 right-16 z-10 -translate-y-1/2 cursor-pointer rounded-full bg-[#E2DED3] p-2 transition-all hover:opacity-75 active:opacity-50"
      >
        <ArrowRight size={24} className="text-[#4F5C39]" />
      </button>
    </div>
  );
}
