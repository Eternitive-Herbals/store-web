"use client";
import SampleImage1 from "@/assets/product-sample-image-1.png";
import SampleImage2 from "@/assets/prod2.png";
import SampleImage3 from "@/assets/prod3.png";
import SampleImage4 from "@/assets/BgImage.jpg";
import { ArrowLeft, ArrowRight, Pause, Play,Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
const DEFAULT_CAROUSEL_ITEMS = [
  {
    carouselImage: SampleImage1,
    product: {
      name: "Immunohigh",
      description: "Supports your body's natural immune defence to help you stay protected every day.",
      _id: "alskdjfhlkajsdhflkajsdf",
    },
  },
  {
    carouselImage: SampleImage2,
    product: {
      name: "Product Two",
      description: "Description for sample product two.",
      _id: "alskdjfhlkajsdhflkajsdf",
    },
  },
  {
    carouselImage: SampleImage3,
    product: {
      name: "Product Three",
      description: "Description for sample product three.",
      _id: "alskdjfhlkajsdhflkajsdf",
    },
  },
  {
    carouselImage: SampleImage4,
    product: {
      name: "Banner Image",
      description: "Elegant background banner.",
      _id: "alskdjfhlkajsdhflkajsdf",
    },
  },
];
export default function CarouselSection() {
  const [carouselItems, setCarouselItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchCarousel() {
      try {
        const res = await fetch("/api/carousel");
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setCarouselItems(data);
          }
        }
      } catch (err) {
        console.error("Failed to fetch carousel items:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchCarousel();
  }, []);
  const items = loading ? [] : (carouselItems.length > 0 ? carouselItems : DEFAULT_CAROUSEL_ITEMS);
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
    if (isPaused || items.length === 0) {
      return;
    }
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [currentIndex, items.length, isPaused]);
  function handleNext() {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  }
  function handlePrev() {
    setDirection(-1);
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + items.length) % items.length,
    );
  }
  function togglePause() {
    if (isPaused) {
      setDirection(1);
      setIsPaused(false);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
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
  if (items.length === 0) {
    return <div className="bg-foreground relative h-dvh snap-start" >
      <Loader2/>
    </div>;
  }
  return (
    <div className="bg-foreground relative flex h-[66dvh] snap-start md:h-dvh">
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
          <Image loading="lazy"
            src={items[currentIndex]?.carouselImage}
            alt={items[currentIndex]?.product?.name || "cta image"}
            fill
            sizes="100vw"
            className="pointer-events-none object-cover"
          />
        </motion.div>
      </AnimatePresence>
      <div className="bg-foreground/66 absolute  bottom-12 left-4 sm:left-20 z-10 flex h-fit min-h-20 w-fit max-w-3xl flex-col justify-between rounded-2xl border border-white/10 px-6 py-4 text-white backdrop-blur-2xl transition-all  md:w-full md:h-40">
        <AnimatePresence initial={false} mode="wait">
          <motion.span
            key={`title-${currentIndex}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="font-comfortaa text-[1rem] md:text-[1.75rem] lg:text-[2.5rem]"
          >
            {items[currentIndex]?.product?.name || "Immunohigh"}
          </motion.span>
        </AnimatePresence>
        <AnimatePresence initial={false} mode="wait">
          <motion.p
            key={`desc-${currentIndex}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="line-clamp-2 text-[0.5rem] font-light md:text-[1rem] lg:text-[1.5rem]"
          >
            {items[currentIndex]?.product?.description || ""}
          </motion.p>
        </AnimatePresence>
      </div>
      <div className="absolute bottom-8 sm:left-20 left-4 z-10 flex h-2 w-xs gap-2 rounded-full p-0.5 md:w-xl lg:w-3xl">
        {Array.from({ length: items.length }).map((_, index) => (
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
      <div className="absolute right-6 sm:right-28 bottom-12 z-10 gap-4 flex">
        <button
          type="button"
          onClick={togglePause}
          className="bg-foreground/66  hidden  sm:cursor-pointer rounded-2xl border border-white/10 p-4 text-white backdrop-blur-2xl transition-all hover:opacity-75 active:opacity-50"
        >
          {isPaused ? (
            <Play size={20} className="fill-white" />
          ) : (
            <Pause size={20} className="fill-white" />
          )}
        </button>
        <Link
          href={`/product/${items[currentIndex]?.product?._id || "alskdjfhlkajsdhflkajsdf"}`}
          className="bg-foreground/66 flex items-center gap-2 rounded-2xl border border-white/10 px-6 py-2 text-white backdrop-blur-2xl transition-all hover:opacity-75 active:opacity-50"
        >
          <span className="text-[.5rem] sm:text-2xl">View Product</span>
          <ArrowRight className="text-white size-3 sm:size-4 nd:size-25 lg:size-6" />
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
