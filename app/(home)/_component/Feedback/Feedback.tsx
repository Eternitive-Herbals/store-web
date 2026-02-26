import { StarIcon } from "lucide-react";

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
const Feedback = () => {
  const FeedbackSection: FeedbackData = {
    title: "What our Customers say",
    ratings: "4.5",
    stars: 4,
    maxRating: [1, 2, 3, 4, 5],
    reviews: [
      {
        name: "John Doe",
        address: "Delhi, India",
        rating: 5,
        feedback:
          "Sufficient particular impossible by reasonable oh expression is. Yet preference connection unpleasant yet melancholy but end appearance. And excellence.",
      },
      {
        name: "John Doe",
        address: "Delhi, India",
        rating: 5,
        feedback:
          "Sufficient particular impossible by reasonable oh expression is. Yet preference connection unpleasant yet melancholy but end appearance. And excellence.",
      },
      {
        name: "John Doe",
        address: "Delhi, India",
        rating: 5,
        feedback:
          "Sufficient particular impossible by reasonable oh expression is. Yet preference connection unpleasant yet melancholy but end appearance. And excellence.",
      },
      {
        name: "John Doe",
        address: "Delhi, India",
        rating: 5,
        feedback:
          "Sufficient particular impossible by reasonable oh expression is. Yet preference connection unpleasant yet melancholy but end appearance. And excellence.",
      },
      {
        name: "John Doe",
        address: "Delhi, India",
        rating: 5,
        feedback:
          "Sufficient particular impossible by reasonable oh expression is. Yet preference connection unpleasant yet melancholy but end appearance. And excellence.",
      },
      {
        name: "John Doe",
        address: "Delhi, India",
        rating: 5,
        feedback:
          "Sufficient particular impossible by reasonable oh expression is. Yet preference connection unpleasant yet melancholy but end appearance. And excellence.",
      },
    ],
  };
  return (
    <div className="bg-ghost-background relative block h-full w-full place-self-center pt-24">
      <div className="title block px-4">
        <div className="mx-auto mb-24">
          <h1 className="text-center text-3xl font-medium tracking-normal">
            {FeedbackSection.title}
          </h1>
        </div>
        <div className="mx-auto flex max-w-4xl items-end justify-between">
          <span className="flex items-end gap-1">
            {" "}
            <h1 className="text-7xl font-semibold">
              {FeedbackSection.ratings}
            </h1>
            <p className="pb-1 text-lg font-normal">Rated by our custmers</p>
          </span>
          <div className="flex items-center justify-end gap-3">
            {FeedbackSection.maxRating.map((id) => (
              <span key={id}>
                <StarIcon
                  size={48}
                  className={`${id > FeedbackSection.stars ? "text-black/30" : "text-star-fill"}`}
                />
              </span>
            ))}
          </div>
        </div>
        <div className=""></div>
      </div>
    </div>
  );
};

export default Feedback;
