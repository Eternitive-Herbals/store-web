"use server";
import Image from "next/image";
import PostCard from "./PostCard";

const OurProd = async () => {
  const products = [
    {
      title: "Immunohigh",
      image: "/prod1.png",
      discription: "Essential for the bone density and health.",
      price: "1000",
    },

    {
      title: "Immunohigh",
      image: "/prod3.png",
      discription: "Essential for the bone density and health.",
      price: "1000",
    },

    {
      title: "Immunohigh",
      image: "/prod3.png",
      discription: "Essential for the bone density and health.",
      price: "1000",
    },
  ];
  return (
    <div className="bg-background relative block gap-8 place-self-center py-24 w-full">
      <Image
        src={`/our_prod.svg`}
        alt="our Prod"
        fill
        className="z-0 object-cover"
      />

      <div className="justif-center items-between flex flex-col gap-16 pt-6 max-w-3xl mx-auto">
        <span className="text-dark-textfont p-2 text-3xl font-medium">
          <h1 className="text-center">Our best sellers</h1>
        </span>

        <PostCard products={products} />
      </div>

      <div className=""></div>
    </div>
  );
};

export default OurProd;
