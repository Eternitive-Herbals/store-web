"use client";

import { useCart } from "@/hooks/useCart";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { ShoppingCart} from "lucide-react";
import { toast } from "sonner";


type ProductCardProps = {
  id: string;
  image: string | StaticImageData;
  title: string;
  description: string;
  price: number;
};

export default function ProductCard({
  id,
  image,
  title,
  description,
  price,
}: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = async () => {
    const res = await addToCart({
      productId: id,
      title,
      price,
      description,
      image: image,
      quantity: 1,
    });

    if (res.success) {
      toast.success("Item added to cart");
    }
  };

  return (
    <div className="group group:hover:shadow-lg relative flex aspect-2/3 max-h-[25rem] w-[48%] flex-col overflow-hidden rounded-xl border border-white/10 transition-shadow duration-300 md:aspect-3/4 md:w-2xs md:rounded-4xl">
      <Link
        href={`/product/${id}`}
        className=" block flex-1 overflow-hidden rounded-lg md:rounded-4xl"
      >
        {image ? (
          <Image
            loading="lazy"
            src={image}
            alt={title || "Product"}
            fill
            sizes="(max-width: 768px) 100vw, 300px"
            className="-z-10 object-cover object-center"
            unoptimized
          />
        ) : (
          <div className="absolute inset-0 -z-10 bg-gray-200"></div>
        )}
      </Link>
      <div className="bg-foreground/33 mt-auto flex h-1/3 w-full flex-col justify-between gap-0.5 p-2 text-white backdrop-blur-lg md:p-4">
        <span className="font-comfortaa line-clamp-1 text-sm leading-none font-bold tracking-wide md:text-xl">
          {title}
        </span>
        <span className="text-sm font-light tracking-wider md:text-xl">
          ₹ {price}
        </span>
        <button
          onClick={() => handleAddToCart()}
          type="button"
          className="bg-foreground cursor-pointer rounded-[20px] px-4 py-1 text-white transition-all hover:opacity-75 active:opacity-50 md:py-2"
        >
          <ShoppingCart className="mr-2 inline h-3 w-3 md:size-4" />
          <span className="mdtext-lg text-sm">Add to Cart</span>
        </button>
      </div>
    </div>
  );
}