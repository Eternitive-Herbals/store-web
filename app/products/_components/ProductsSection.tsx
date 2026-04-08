"use client";

import Image from "next/image";
import Sidebar from "./Sidebar";
import Product1 from "@/assets/product-sample-image-1.png";
import BackgroundTexture from "@/assets/background-texture-brown-long-1.svg";
import { ChevronDown } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { useState } from "react";

export default function ProductsSection() {
  const [sortBy, setSortBy] = useState("featured");

  const products = [
    {
      image: Product1,
      title: "Immunohigh",
      description: "Enhances bone density",
      price: 1000,
    },
    {
      image: Product1,
      title: "Asthistrong",
      description: "Enhances bone density",
      price: 1000,
    },
    {
      image: Product1,
      title: "Vital Strong",
      description: "Enhances bone density",
      price: 1000,
    },
    {
      image: Product1,
      title: "Livoclean",
      description: "Enhances bone density",
      price: 1000,
    },
    {
      image: Product1,
      title: "Supplement Name",
      description: "Enhances bone density",
      price: 1000,
    },
    {
      image: Product1,
      title: "Supplement Name",
      description: "Enhances bone density",
      price: 1000,
    },
    {
      image: Product1,
      title: "Supplement Name",
      description: "Enhances bone density",
      price: 1000,
    },
    {
      image: Product1,
      title: "Supplement Name",
      description: "Enhances bone density",
      price: 1000,
    },
    {
      image: Product1,
      title: "Supplement Name",
      description: "Enhances bone density",
      price: 1000,
    },
  ];

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setSortBy(e.target.value);
  }

  return (
    <section className="relative flex w-full gap-4 px-[calc(100dvw/24)] py-24">
      <Image
        src={BackgroundTexture}
        alt="Background Texture"
        fill
        className="fixed inset-0 -z-10 object-cover opacity-5"
      />

      <Sidebar />

      <div className="flex min-h-full flex-1 flex-col gap-4">
        <div className="sticky top-33 z-20 flex items-center place-self-end rounded-2xl bg-[#E2DED3] transition-all hover:opacity-75 active:opacity-50">
          <select
            defaultValue="featured"
            onChange={handleChange}
            className="w-fit cursor-pointer appearance-none py-2 pr-12 pl-4 text-xl outline-none"
          >
            <option value="featured">Featured</option>
            <option value="best_selling">Best Selling</option>
            <option value="price_low_high">Price: Low to High</option>
            <option value="price_high_low">Price: High to Low</option>
          </select>
          <span className="pointer-events-none absolute right-4">
            <ChevronDown size={24} />
          </span>
        </div>

        <div className="flex flex-wrap justify-between gap-x-4 gap-y-16 p-2">
          {products.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
}
