export const getProductReviews = async (productId: string) => {
  const res = await fetch(`/api/review?productId=${productId}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return [];
  }

  const data = await res.json();
  return data.reviews || [];
};

export const createReview = async (reviewData: {
  productId: string;
  rating: number;
  content: string;
  author: string;
  image?: string;
}) => {
  const res = await fetch("/api/review", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reviewData),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to create review");
  }

  const data = await res.json();
  return data.review;
};
