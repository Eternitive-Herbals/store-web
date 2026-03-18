"use client";

import { IndianRupee, Star } from "lucide-react";
import Image from "next/image";

type prod = {
  _id?: string;
  image: string;
  title: string;
  description: string;
  price: number | string;
};

const ProductGrid = ({ products }: { products: prod[] }) => {
  const addToCart = async (product: prod) => {
    await fetch("/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        productId: product._id,
        title: product.title,
        price: product.price,
        image: product.image,
      }),
    });
  };

  return (
    <div className="flex items-center justify-center py-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-17">
        {products.map((product, idx) => (
          <div
            key={idx}
            className="relative h-125 w-82 overflow-hidden rounded-4xl"
          >
            <Image
              src={product.image}
              alt="product"
              fill
              className="object-cover"
            />

            <div className="absolute right-3 bottom-3 left-3 rounded-4xl border border-[#5F5F5F]/20 bg-[#1E1E1E]/30 p-5 text-white backdrop-blur-[5px]">
              <div className="flex items-center justify-between">
                <h2 className="font-sf-pro-text text-[18px] font-normal">
                  {product.title}
                </h2>

                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill="#EDC06F" stroke="none" />
                  ))}
                </div>
              </div>

              <p className="text-[12px] opacity-80">{product.description}</p>

              <span className="font-sf-pro-text mt-2 flex items-center text-[24px] font-normal">
                <IndianRupee size={24} />
                {product.price}
              </span>

              <button
                onClick={() => addToCart(product)}
                className="mt-3 h-10.75 w-67.5 cursor-pointer rounded-full bg-[#1B1B1B] text-white duration-300 hover:scale-105"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;