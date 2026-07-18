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
    <div className="flex w-xs flex-col gap-4">
      <Link
        href={`/product/${id}`}
        className="hover:outline-foreground relative flex aspect-3/4 w-full items-end overflow-hidden rounded-4xl transition-all hover:shadow-2xl active:shadow-none"
      >
        {image ? (
          <Image
            src={image}
            alt={title || "Product"}
            fill
            sizes="(max-width: 768px) 100vw, 300px"
            className="-z-10 object-cover"
          />
        ) : (
          <div className="absolute inset-0 -z-10 bg-gray-200"></div>
        )}
        <div className="bg-foreground/33 flex h-1/3 w-full flex-col justify-between gap-0.5 rounded-3xl border border-white/10 p-4 text-white backdrop-blur-lg">
          <span className="font-comfortaa line-clamp-1 text-xl leading-none font-bold tracking-wide">
            {title}
          </span>
          <span className="font-light tracking-wider">₹ {price}</span>
          <button
            onClick={() => handleAddToCart()}
            type="button"
            className="bg-foreground cursor-pointer rounded-[20px] px-4 py-2 text-white transition-all hover:opacity-75 active:opacity-50"
          >
            
            <ShoppingCart className="mr-2  inline h-4 w-4" />
            <span className="text-lg ">Add to Cart</span>
          </button>
        </div>
      </Link>
    </div>
  );
}