"use server";
import Image from "next/image";
import PostCard from "./PostCard";
import { ArrowRight } from "lucide-react";

const OurProd = async () => {
  const products = [
    {
      title: "Immunohigh",
      image: "/assets/prod1.png",
      discription: "Essential for the bone density and health.",
      price: "1000",
    },

    {
      title: "Immunohigh",
      image: "/assets/prod3.png",
      discription: "Essential for the bone density and health.",
      price: "1000",
    },

    {
      title: "Immunohigh",
      image: "/assets/prod3.png",
      discription: "Essential for the bone density and health.",
      price: "1000",
    },
  ];
  return (
    <div className="bg-background text-Comfortaa_Heading_Text relative block h-full w-full gap-8 place-self-center py-42">
      <Image
        src={`/assets/our_prod.svg`}
        alt="our Prod"
        fill
        className="z-0 object-cover"
      />

      <div className="justif-center items-between mx-auto flex max-w-3xl flex-col gap-16">
        <span className="text-dark-textfont pt-2 pb-14 text-3xl font-medium">
          <h1 className="text-center text-Comfortaa_Heading_Text">Our best sellers</h1>
        </span>

        <PostCard products={products} />
      </div>

      <div className="flex justify-center mt-10">
        <button className="text-[12px] border border-neutral-800 px-5 py-1.5 rounded-full text-neutral-800 hover:bg-black hover:text-white transition flex items-center gap-2">
          View Product
          <ArrowRight className="-rotate-45" size={14} />
        </button>
      </div>
    </div>
  );
};

export default OurProd;
