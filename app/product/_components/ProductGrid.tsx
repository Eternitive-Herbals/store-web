"use server";
import { IndianRupee, Star } from "lucide-react";
import Image from "next/image";

type prod = {
  image: string;
  title: string;
  discription: string;
  price: string;
};

const ProductGrid = async ({ products }: { products: prod[] }) => {
  return (
    <div className="flex  justify-center items-center py-16">
      
   <div className=" grid grid-cols-3 gap-17">
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

            <div className="absolute bottom-3 left-3 right-3 rounded-4xl border border-[#5F5F5F]/20 bg-[#1E1E1E]/30 p-5 text-white backdrop-blur-[5px]">
            <div className="flex items-center justify-between">
            <h2 className="font-sf-pro-text text-[18px] font-normal">{product.title}</h2>

            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} fill="#EDC06F" stroke="none" />
              ))}
            </div>
            </div>

            <p className="text-[12px] opacity-80">{product.discription}</p>

            <span className="flex items-center mt-2 text-[24px] font-sf-pro-text font-normal">
              <IndianRupee size={24} />
              {product.price}
            </span>

            <button className="mt-3 w-67.5 h-10.75 rounded-full bg-[#1B1B1B] text-white cursor-pointer hover:scale-105 duration-300">
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