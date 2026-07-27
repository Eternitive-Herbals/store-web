"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ReviewCard, { ReviewCardProps } from "@/components/ReviewCard";
type ReviewCarouselProps = {
  reviews: ReviewCardProps[];
};
export default function ReviewCarousel({ reviews }: ReviewCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const checkScrollLimits = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 5);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5);
      // Dynamically calculate active indicator index
      const card = scrollContainerRef.current.firstElementChild as HTMLElement;
      if (card) {
        const cardWidth = card.clientWidth + 24; // Card width + gap-6
        const index = Math.round(scrollLeft / cardWidth);
        setActiveIndex(Math.min(Math.max(0, index), reviews.length - 1));
      }
    }
  };
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScrollLimits, { passive: true });
      // Initial check
      checkScrollLimits();
      // Check on window resize
      window.addEventListener("resize", checkScrollLimits);
    }
    return () => {
      if (container) {
        container.removeEventListener("scroll", checkScrollLimits);
      }
      window.removeEventListener("resize", checkScrollLimits);
    };
  }, [reviews]);
  const handleScroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const card = container.firstElementChild as HTMLElement;
      if (card) {
        const cardWidth = card.clientWidth + 24; // Card width + gap-6
        const targetScroll =
          direction === "left"
            ? container.scrollLeft - cardWidth
            : container.scrollLeft + cardWidth;
        container.scrollTo({
          left: targetScroll,
          behavior: "smooth",
        });
      }
    }
  };
  const scrollToCard = (index: number) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const card = container.firstElementChild as HTMLElement;
      if (card) {
        const cardWidth = card.clientWidth + 24;
        container.scrollTo({
          left: index * cardWidth,
          behavior: "smooth",
        });
      }
    }
  };
  return (
    <div className="relative flex w-full flex-col items-center">
      {/* Left/Right Buttons and Carousel Container */}
      <div className="relative flex w-full items-center justify-center">
        {/* Left Scroll Button */}
        <button
          type="button"
          onClick={() => handleScroll("left")}
          disabled={!canScrollLeft}
          className="absolute left-4 z-20 cursor-pointer rounded-full bg-[#E2DED3] p-3 text-[#4F5C39] shadow-md transition-all hover:scale-105 hover:bg-[#d5d0c3] active:scale-95 disabled:pointer-events-none disabled:opacity-30 md:left-12"
          aria-label="Previous reviews"
        >
          <ArrowLeft size={24} strokeWidth={2.5} />
        </button>
        {/* Outer Container */}
        <div className="relative w-full max-w-6xl overflow-visible px-4">
          <div
            ref={scrollContainerRef}
            className="scrollbar-none relative flex w-full snap-x snap-mandatory gap-6 overflow-visible overflow-x-auto scroll-smooth px-2 py-6"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {/* <div className="from-background to-background/0 absolute inset-0 z-10 w-10 bg-linear-to-r " />
            <div className="from-background to-background/0 absolute inset-0 z-10 w-10 ml-auto  translate-x-2 bg-linear-to-l" /> */}
            {reviews.map((review, index) => (
              <div key={index} className="shrink-0 snap-start overflow-visible">
                <ReviewCard {...review} />
              </div>
            ))}
          </div>
        </div>
        {/* Right Scroll Button */}
        <button
          type="button"
          onClick={() => handleScroll("right")}
          disabled={!canScrollRight}
          className="absolute right-4 z-20 cursor-pointer rounded-full bg-[#E2DED3] p-3 text-[#4F5C39] shadow-md transition-all hover:scale-105 hover:bg-[#d5d0c3] active:scale-95 disabled:pointer-events-none disabled:opacity-30 md:right-12"
          aria-label="Next reviews"
        >
          <ArrowRight size={24} strokeWidth={2.5} />
        </button>
      </div>
      {/* Navigation Dot Indicators */}
      <div className="flex gap-2">
        {reviews.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToCard(index)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              activeIndex === index
                ? "w-8 bg-[#33556E]"
                : "w-2.5 bg-[#ADBBC5] hover:bg-stone-400"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
