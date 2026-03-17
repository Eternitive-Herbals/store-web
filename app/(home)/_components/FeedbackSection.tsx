"use client"
import { useState } from "react";
import { StarIcon, ArrowLeft, ArrowRight } from "lucide-react";

type Review = {
  name: string;
  address: string;
  rating: number;
  feedback: string;
};

type FeedbackData = {
  title: string;
  ratings: string;
  stars: number;
  maxRating: number[];
  reviews: Review[];
};

export default function FeedbackSection() {
  const [currentPage, setCurrentPage] = useState(0);

  const FeedbackSectionData: FeedbackData = {
    title: "What our Customers say",
    ratings: "4.5",
    stars: 4,
    maxRating: [1, 2, 3, 4, 5],
    reviews: [
      {
        name: "Sidharth",
        address: "Delhi, India",
        rating: 5,
        feedback:
          "Sufficient particular impossible by reasonable oh expression is. Yet preference connection unpleasant yet melancholy but end appearance. And excellence.",
      },
      {
        name: "Sidharth",
        address: "Delhi, India",
        rating: 5,
        feedback:
          "Sufficient particular impossible by reasonable oh expression is. Yet preference connection unpleasant yet melancholy but end appearance. And excellence.",
      },
      {
        name: "Sidharth",
        address: "Delhi, India",
        rating: 5,
        feedback:
          "Sufficient particular impossible by reasonable oh expression is. Yet preference connection unpleasant yet melancholy but end appearance. And excellence.",
      },
      {
        name: "Sidharth",
        address: "Delhi, India",
        rating: 5,
        feedback:
          "Sufficient particular impossible by reasonable oh expression is. Yet preference connection unpleasant yet melancholy but end appearance. And excellence.",
      },
      {
        name: "Sidharth",
        address: "Delhi, India",
        rating: 5,
        feedback:
          "Sufficient particular impossible by reasonable oh expression is. Yet preference connection unpleasant yet melancholy but end appearance. And excellence.",
      },
      {
        name: "Sidharth",
        address: "Delhi, India",
        rating: 5,
        feedback:
          "Sufficient particular impossible by reasonable oh expression is. Yet preference connection unpleasant yet melancholy but end appearance. And excellence.",
      },
    ],
  };

  // Responsive: 1 card on mobile, 2 on md+
  // We'll use JS-driven pages: 1 per page on mobile, 2 per page on md+
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false,
  );

  // Listen for resize
  if (typeof window !== "undefined") {
    window.onresize = () => {
      const mobile = window.innerWidth < 768;
      if (mobile !== isMobile) setIsMobile(mobile);
    };
  }

  const cardsPerPage = isMobile ? 1 : 2;
  const totalPages = Math.ceil(
    FeedbackSectionData.reviews.length / cardsPerPage,
  );
  const visibleReviews = FeedbackSectionData.reviews.slice(
    currentPage * cardsPerPage,
    currentPage * cardsPerPage + cardsPerPage,
  );

  const prev = () => setCurrentPage((p) => Math.max(0, p - 1));
  const next = () => setCurrentPage((p) => Math.min(totalPages - 1, p + 1));

  return (
    <div className="relative block h-full w-full place-self-center bg-[#F9F8F6]">
      <div className="title block px-4 py-16 sm:py-20 md:py-26">
        {/* Title */}
        <div className="mx-auto mb-10 md:mb-20">
          <h1 className="font-comfortaa text-center text-2xl font-medium tracking-normal sm:text-3xl">
            {FeedbackSectionData.title}
          </h1>
        </div>

        {/* Ratings row */}
        <div className="mx-auto mb-10 flex max-w-4xl flex-col items-center gap-6 sm:flex-row sm:items-end sm:justify-between md:mb-12">
          <span className="flex items-end gap-1">
            <h1 className="font-comfortaa text-6xl font-semibold sm:text-7xl">
              {FeedbackSectionData.ratings}
            </h1>
            <p className="pb-1 text-base font-normal sm:text-lg">
              Rated by our customers
            </p>
          </span>

          <div className="flex items-center justify-center gap-2 sm:gap-3">
            {FeedbackSectionData.maxRating.map((id) => (
              <span key={id}>
                <StarIcon
                  size={32}
                  className={`sm:h-12 sm:w-12 ${
                    id > FeedbackSectionData.stars
                      ? "text-black/30"
                      : "fill-[#FFCC32] text-[#FFCC32]"
                  }`}
                />
              </span>
            ))}
          </div>
        </div>

        {/* Carousel container */}
        <div className="relative mx-auto max-w-4xl px-10 sm:px-12">
          {/* Left arrow */}
          <button
            onClick={prev}
            disabled={currentPage === 0}
            className="absolute top-1/2 left-0 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-[#E2DED3] transition-opacity disabled:opacity-30 sm:h-10 sm:w-10"
          >
            <ArrowLeft size={18} className="text-[#4F5C39]" />
          </button>

          {/* Cards grid */}
          <div className="grid min-h-[280px] grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
            {visibleReviews.map((review, index) => (
              <div
                key={index}
                className="rounded-2xl bg-white p-5 shadow-lg shadow-[#E2DED3] sm:p-6"
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 flex-shrink-0 rounded-full bg-[#D9D9D9] sm:h-10 sm:w-10" />
                    <div>
                      <h3 className="text-sm font-semibold text-[#0F2B4A] sm:text-base">
                        {review.name}
                      </h3>
                      <p className="text-[10px] text-[#474747] sm:text-[11px]">
                        {review.address}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-shrink-0 gap-0.5 sm:gap-1">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <StarIcon
                        key={i}
                        size={14}
                        className="fill-[#FFCC32] text-[#FFCC32] sm:h-4 sm:w-4"
                      />
                    ))}
                  </div>
                </div>

                <p className="text-sm leading-relaxed text-[#232323]">
                  {review.feedback}
                </p>
              </div>
            ))}
          </div>

          {/* Right arrow */}
          <button
            onClick={next}
            disabled={currentPage === totalPages - 1}
            className="absolute top-1/2 right-0 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-[#E2DED3] transition-opacity disabled:opacity-30 sm:h-10 sm:w-10"
          >
            <ArrowRight size={18} className="text-[#4F5C39]" />
          </button>
        </div>

        {/* Dot indicators */}
        <div className="mt-8 flex items-center justify-center gap-3 md:mt-12">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i)}
              className={`h-2 w-2 rounded-full transition-colors ${
                i === currentPage ? "bg-black/70" : "bg-black/30"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
