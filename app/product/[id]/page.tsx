import Image, { StaticImageData } from "next/image";
import prod from "@/assets/product/Frame 1437253859.png";
import sqImage from "@/assets/product/Rectangle 574057249.png";
import ProductGrid from "../_components/ProductGrid";
import ProductDetail from "../_components/ProductDetail";
import Ingredient from "../_components/Ingredient";
import RatingSection from "../_components/RatingSection";
import ReviewSec from "../_components/ReviewSec";
import Rating_Review_section from "../_components/Rating_Review_section";
export default async function page({ params }: { params: any }) {
  const { id } = params;

  type propgrid = { name: string; href: StaticImageData };

  const ProdGrid: propgrid[] = [
    { name: "prod 1", href: sqImage },
    { name: "prod 2", href: sqImage },
    { name: "prod 3", href: sqImage },
    { name: "prod 4", href: sqImage },
  ];

  if (id) return console.log({ message: "product not found" });
  return (
    <div className="">
      <div className="mx-auto flex items-start justify-between px-[calc(100dvw/24)] pt-41 pb-6">
        {/* Prodcuti image section */}
        <ProductGrid prod={prod} sqImage={ProdGrid} />

        {/* info section */}

        <ProductDetail />
      </div>

      <Ingredient />
      <Rating_Review_section />
    </div>
  );
}
