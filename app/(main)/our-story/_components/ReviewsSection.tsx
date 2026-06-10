import { Star, StarHalf, User } from "lucide-react";

interface Review {
  name: string;
  location: string;
  rating: number;
  text: string;
}

const reviews: Review[] = [
  {
    name: "Sidharth",
    location: "Delhi, India",
    rating: 5,
    text: "Sufficient particular improbable by reasonable do expression in. No preference connection stylebook yet researching but end appearance. Add excellence.",
  },
  {
    name: "Sidharth",
    location: "Delhi, India",
    rating: 4,
    text: "Sufficient particular improbable by reasonable do expression in. No preference connection stylebook yet researching but end appearance. Add excellence.",
  },
  {
    name: "Sidharth",
    location: "Delhi, India",
    rating: 5,
    text: "Sufficient particular improbable by reasonable do expression in. No preference connection stylebook yet researching but end appearance. Add excellence.",
  },
  {
    name: "Sidharth",
    location: "Delhi, India",
    rating: 4,
    text: "Sufficient particular improbable by reasonable do expression in. No preference connection stylebook yet researching but end appearance. Add excellence.",
  },
];

function StarRating({ rating, max = 5 }: { rating: number; max?: number }) {
  return (
    <div className="flex gap-0.5 text-star-fill">
      {Array.from({ length: max }).map((_, i) => (
        <Star
          key={i}
          size={14}
          className={
            i < Math.floor(rating)
              ? "fill-star-fill text-star-fill"
              : "text-stone-200"
          }
        />
      ))}
    </div>
  );
}

export default function ReviewsSection() {
  const totalReviews = reviews.length;
  const avgRating =
    totalReviews > 0
      ? (
          reviews.reduce((acc, curr) => acc + curr.rating, 0) / totalReviews
        ).toFixed(1)
      : "0.0";
  const numRating = parseFloat(avgRating);

  return (
    <section className="bg-background px-[calc(100dvw/24)] py-24">
      <h2 className="font-comfortaa mb-10 text-center text-3xl font-bold text-primary-background">
        What Our Customers Say
      </h2>

      {/* Rating Summary */}
      <div className="mx-auto mb-10 flex max-w-5xl items-center justify-between px-2">
        <div>
          <span className="font-comfortaa text-6xl font-bold text-primary-background">
            {avgRating}
          </span>
          <p className="mt-1 text-xs text-stone-400">
            Rated by our customers
          </p>
        </div>
        <div className="flex gap-2 text-star-fill">
          {Array.from({ length: Math.floor(numRating) }).map((_, index) => (
            <Star key={`full-${index}`} size={40} className="fill-star-fill" />
          ))}
          {numRating % 1 !== 0 && (
            <span className="relative">
              <Star size={40} />
              <StarHalf
                size={40}
                className="absolute inset-0 fill-star-fill"
              />
            </span>
          )}
          {Array.from({ length: 5 - Math.ceil(numRating) }).map((_, index) => (
            <Star key={`empty-${index}`} size={40} />
          ))}
        </div>
      </div>

      {/* Review Cards Grid */}
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 md:grid-cols-2">
        {reviews.map((review, i) => (
          <div
            key={i}
            className="rounded-2xl border border-stone-100 bg-white p-5 shadow-sm"
          >
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex size-9 items-center justify-center rounded-full bg-stone-200">
                  <User size={16} className="text-stone-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-primary-background">
                    {review.name}
                  </p>
                  <p className="text-xs text-stone-400">{review.location}</p>
                </div>
              </div>
              <StarRating rating={review.rating} />
            </div>
            <p className="text-sm leading-relaxed text-stone-500">
              {review.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
