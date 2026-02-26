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
    <div className="bg-background h-screen-2 relative block w-full gap-8 place-self-center py-42">
      <Image
        src={`/our_prod.svg`}
        alt="our Prod"
        fill
        className="z-0 object-cover"
      />

      <div className="justif-center items-between mx-auto flex max-w-3xl flex-col gap-16">
        <span className="text-dark-textfont pt-2 pb-14 text-3xl font-medium">
          <h1 className="text-center">Our best sellers</h1>
        </span>

        <PostCard products={products} />
      </div>

      <div className=""></div>
    </div>
  );
};

export default OurProd;
