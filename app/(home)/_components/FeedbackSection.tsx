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

  return (
    <div className="relative block h-full w-full place-self-center bg-[#F9F8F6]">
      <div className="title block px-4 py-26">
        <div className="mx-auto mb-20">
          <h1 className="font-comfortaa text-center text-3xl font-medium tracking-normal">
            {FeedbackSectionData.title}
          </h1>
        </div>
        <div className="mx-auto mb-12 flex max-w-4xl items-end justify-between">
          <span className="flex items-end gap-1">
            <h1 className="font-comfortaa text-7xl font-semibold">
              {FeedbackSectionData.ratings}
            </h1>
            <p className="pb-1 text-lg font-normal">Rated by our customers</p>
          </span>

          <div className="flex items-center justify-end gap-3">
            {FeedbackSectionData.maxRating.map((id) => (
              <span key={id}>
                <StarIcon
                  size={48}
                  className={`${
                    id > FeedbackSectionData.stars
                      ? "text-black/30"
                      : "fill-[#FFCC32] text-[#FFCC32]"
                  }`}
                />
              </span>
            ))}
          </div>
        </div>

        <div className="relative mx-auto h-104.5 w-326.5">
          <button className="absolute top-52 -left-16 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[#E2DED3]">
            <ArrowLeft size={20} className="text-[#4F5C39]"/>
          </button>

          <button className="absolute top-52 -right-16 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[#E2DED3]">
            <ArrowRight size={20} className="text-[#4F5C39]" />
          </button>

          <div className="mx-auto flex h-full max-w-4xl items-center justify-center">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {FeedbackSectionData.reviews.slice(0, 4).map((review, index) => (
                <div key={index} className="rounded-2xl bg-[#FFFFFF] p-6 shadow-lg shadow-[#E2DED3]">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-[#D9D9D9]" />
                      <div>
                        <h3 className="font-semibold text-[#0F2B4A] font-sf-pro-text">{review.name}</h3>
                        <p className="text-[11px] text-[#474747] font-sf-pro-text">
                          {review.address}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-1">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <StarIcon
                          key={i}
                          size={16}
                          className="text-[#FFCC32] fill-[#FFCC32]"
                        />
                      ))}
                    </div>
                  </div>

                  <p className="text-sm leading-relaxed text-[#232323] font-sf-pro-text">
                    {review.feedback}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 flex items-center justify-center gap-3">
            <span className="h-2 w-2 rounded-full bg-black/70"></span>
            <span className="h-2 w-2 rounded-full bg-black/30"></span>
            <span className="h-2 w-2 rounded-full bg-black/30"></span>
            <span className="h-2 w-2 rounded-full bg-black/30"></span>
          </div>
        </div>
      </div>
    </div>
  );
}
