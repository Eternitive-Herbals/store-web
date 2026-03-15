import Image from "next/image";
import PostCard from "./PostCard";
import { ArrowUpRight } from "lucide-react";
import Prod1 from "@/assets/prod1.png";
import Prod2 from "@/assets/prod2.png";
import Prod3 from "@/assets/prod3.png";
import OurProd from "@/assets/our_prod.svg";
import Link from "next/link";
export default function OurProductsSection() {
  const products = [
    {
      title: "Immunohigh",
      image: Prod1.src,
      discription: "Essential for the bone density and health.",
      price: "1000",
    },

    {
      title: "Immunohigh",
      image: Prod2.src,
      discription: "Essential for the bone density and health.",
      price: "1000",
    },

    {
      title: "Immunohigh",
      image: Prod3.src,
      discription: "Essential for the bone density and health.",
      price: "1000",
    },
  ];

  return (
    <div className="relative block h-full w-full gap-8 place-self-center">
      <Image src={OurProd} alt="our Prod" fill className="object-cover" />

      <div className="justif-center items-between mx-auto flex max-w-3xl flex-col gap-16">
        <span className="text-dark-textfont mt-42 pt-2 pb-14 text-3xl font-medium">
          <h1 className="font-comfortaa text-center">Our best sellers</h1>
        </span>

        <PostCard products={products} />
      </div>

      <div className="mt-14 flex justify-center pb-63">
        <Link
          href={"/product"}
          className="font-sf-pro-text z-10 flex h-15 w-61.25 cursor-pointer items-center justify-center gap-6 rounded-full border border-neutral-800 text-2xl font-semibold text-[#1E1E1E] transition hover:bg-black hover:text-white"
        >
          View Product
          <span className="rounded-3xl bg-[#D9D9D9]/40 p-2">
            <ArrowUpRight className="text-[#7d7878]" size={29} />
          </span>
        </Link>
      </div>
    </div>
  );
}
