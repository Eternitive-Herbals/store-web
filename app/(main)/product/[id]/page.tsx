import connectDB from "@/lib/db";
import { Product } from "@/models/Product";
import ProductGrid from "../_components/ProductGrid";
import ProductDetail from "../_components/ProductDetail";
import Ingredient from "../_components/Ingredient";
import Rating_Review_section from "../_components/Rating_Review_section";
import { notFound } from "next/navigation";

import "@/models/Ingredient";
import "@/models/Category";
import "@/models/Goal";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;

  await connectDB();

  const product = await Product.findById(id)
    .populate("ingredients")
    .populate("category")
    .populate("goal"); 

  if (!product) {
    notFound();
  }

  // Serialize for client components
  const serialized = JSON.parse(JSON.stringify(product));

  return (
    <div className="">
      <div className="mx-auto flex items-start justify-between px-[calc(100dvw/24)] pt-41 pb-6">
        {/* Product image section */}
        <ProductGrid product={serialized} />

        {/* info section */}
        <ProductDetail product={serialized} />
      </div>

      <Ingredient product={serialized} />
      <Rating_Review_section productId={serialized._id} />
    </div>
  );
}
