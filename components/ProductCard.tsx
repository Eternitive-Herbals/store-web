"use client";

import { useCart } from "@/hooks/useCart";
import { toast } from "sonner";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

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
        className="hover:outline-foreground shadow-foreground relative flex aspect-3/4 w-full items-end overflow-hidden rounded-4xl p-2 transition-all hover:shadow-2xl active:shadow-none"
      >
        <Image 
          src={
            typeof image === 'string' 
              ? (image.startsWith('http') 
                  ? (image.includes('://') ? image : '/assets/products-sample-image-1.png') 
                  : (image.startsWith('/') ? image : `/${image}`)) 
              : image
          } 
          alt={title} 
          fill 
          className="-z-10 object-cover" 
        />
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
