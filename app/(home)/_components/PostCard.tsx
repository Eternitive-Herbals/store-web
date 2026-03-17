"use server";
import { ArrowUpRight, IndianRupee } from "lucide-react";
import Image from "next/image";

type prod = {
  image: string;
  title: string;
  discription: string;
  price: string;
};

const PostCard = async ({ products }: { products: prod[] }) => {
  return (
    <>
      <div className="flex flex-col items-center gap-12 px-4">
      {products.map((product, idx) => (
        <div
          key={idx}
          className={`flex ${
            idx % 2 !== 0 ? "flex-row-reverse" : "flex-row"
          } bg-prodcard-background relative 
          w-full max-w-255 h-98
          items-start justify-between overflow-hidden rounded-4xl`}
        >
          {/* Image */}
          <div className="relative h-full w-[40%] min-w-62.5 shrink-0">
            <Image
              alt="prod"
              src={product.image}
              fill
              className="object-cover"
            />
          </div>

          {/* Text */}
          <div className="flex w-full flex-col justify-start pt-20 pl-6 pr-6 font-sf-pro-text">
            <h1 className="text-2xl font-normal">{product.title}</h1>

            <p className="max-w-60">{product.discription}</p>

            <span className="flex items-center text-xl font-normal">
              <IndianRupee size={20} />
              {product.price}
            </span>
          </div>

          {/* Button */}
          <button
            className={`tracking-tight text-white font-sf-pro-text absolute 
            bottom-4 sm:bottom-6
            flex h-11 sm:h-15 
            w-42.5 sm:w-61.25 
            text-sm sm:text-2xl 
            items-center justify-center gap-2 sm:gap-3
            rounded-full bg-[#1B1B1B] py-2 pr-2 pl-4 sm:pl-5
            ${idx % 2 !== 0 ? "left-4 sm:left-6" : "right-4 sm:right-6"}`}
          >
            View Products
            <span className="rounded-full bg-[#D9D9D9]/40 p-1.5 sm:p-2">
              <ArrowUpRight size={20} className="sm:w-7.5 sm:h-7.5" />
            </span>
          </button>
        </div>
      ))}
    </div>
    </>
  );
};

export default PostCard;