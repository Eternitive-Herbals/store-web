import Image, { StaticImageData } from "next/image";
import prod from "@/assets/product/Frame 1437253859.png";
import sqImage from "@/assets/product/Rectangle 574057249.png";
import ProductGrid from "../_components/ProductGrid";
import ProductDetail from "../_components/ProductDetail";
import Ingredient from "../_components/Ingredient";
import RatingSection from "../_components/RatingSection";
import ReviewSec from "../_components/ReviewSec";
import Rating_Review_section from "../_components/Rating_Review_section";
export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  // Use absolute URL for server-side fetch in Next.js
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/products/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return (
      <div className="flex h-screen items-center justify-center pt-41">
        <h1 className="text-2xl font-bold">Product not found</h1>
      </div>
    );
  }

  const product = await res.json();

  return (
    <div className="">
      <div className="mx-auto flex items-start justify-between px-[calc(100dvw/24)] pt-41 pb-6">
        {/* Product image section */}
        <ProductGrid product={product} />

        {/* info section */}
        <ProductDetail product={product} />
      </div>

      <Ingredient product={product} />
      <Rating_Review_section />
    </div>
  );
}
