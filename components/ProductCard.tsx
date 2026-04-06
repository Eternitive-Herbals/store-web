"use client";

import { useCart } from "@/hooks/useCart";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

type ProductCardProps = {
  image: StaticImageData;
  title: string;
  description: string;
  price: number;
};

export default function ProductCard({
  image,
  title,
  description,
  price,
}: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = async () => {
    const res = await addToCart({
      productId: title,
      title,
      price,
      description,
      image: image.src,
      quantity: 1,
    });

    if (res.success) {
      alert("Item added to cart");
    }
  };

  return (
    <div className="flex w-xs flex-col gap-4">
      <Link
        href={"/product/productId"}
        className="hover:outline-foreground shadow-foreground relative flex aspect-3/4 w-full items-end overflow-hidden rounded-4xl p-2 transition-all hover:shadow-2xl active:shadow-none"
      >
        <Image src={image} alt={title} fill className="-z-10 object-cover" />
        <div className="bg-foreground/33 flex h-fit w-full flex-col gap-0.5 rounded-3xl border border-white/10 p-4 text-white backdrop-blur-lg">
          <span className="font-comfortaa line-clamp-1 text-xl leading-none font-bold tracking-wide">
            {title}
          </span>
          <span className="line-clamp-1 font-light tracking-wider opacity-90">
            {description}
          </span>
          <span className="font-light tracking-wider">₹ {price}</span>
        </div>
      </Link>
      <button
        onClick={() => handleAddToCart()}
        type="button"
        className="bg-foreground cursor-pointer rounded-[20px] px-4 py-2 text-white transition-all hover:opacity-75 active:opacity-50"
      >
        <span className="text-lg">Add to Cart</span>
      </button>
    </div>
  );
}
