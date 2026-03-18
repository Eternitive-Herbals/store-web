import Image from "next/image";
import Prod1 from "@/assets/prod1.png";
import Prod2 from "@/assets/prod2.png";
import Prod3 from "@/assets/prod3.png";
import BackgroundTexture from "@/assets/background-texture-brown-long-1.svg";
import FeaturedProductCard, {
  FeaturedProductCardProps,
} from "./FeaturedProductCard";

export default function FeaturedProductsSection() {
  const products: FeaturedProductCardProps[] = [
    {
      title: "Immunohigh",
      image: Prod1,
      description: "Essential for the bone density and health.",
      price: 1000,
    },

    {
      title: "Immunohigh",
      image: Prod2,
      description: "Essential for the bone density and health.",
      price: 1000,
    },

    {
      title: "Immunohigh",
      image: Prod3,
      description: "Essential for the bone density and health.",
      price: 1000,
    },
  ];

  return (
    <div className="min-h-screen-2 relative flex flex-col items-center justify-center gap-16 px-24 py-48">
      <Image
        src={BackgroundTexture}
        alt="Background Texture"
        fill
        className="-z-10 object-cover opacity-5"
      />

      <span className="font-comfortaa mb-16 text-4xl font-bold">
        Our Best Sellers
      </span>

      {products.map((product, index) => (
        <FeaturedProductCard
          key={index}
          {...product}
          reverse={index % 2 !== 0}
        />
      ))}
    </div>
  );
}
