import Image from "next/image";
import Sidebar from "./Sidebar";
import Product1 from "@/assets/product-sample-image-1.png";
import BackgroundTexture from "@/assets/background-texture-brown-long-1.svg";
import { ChevronDown, ListFilter } from "lucide-react";
import ProductCard from "@/components/ProductCard";

export default async function ProductsSection() {
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
        <div className="top sticky top-33 z-20 flex items-center place-self-end">
          <div className="flex items-center gap-2 rounded-l-2xl bg-[#E2DED3] py-2 pr-2 pl-4">
            <ListFilter size={22} />
            <span className="text-xl">Sort By :</span>
          </div>
          <button className="flex cursor-pointer items-center gap-2 rounded-r-2xl bg-[#E2DED3] py-2 pr-4 pl-2 transition-all hover:opacity-75 active:opacity-50">
            <span className="text-xl">Relevance</span>
            <ChevronDown size={22} />
          </button>
        </div>

        <div className="flex flex-wrap justify-between gap-x-4 gap-y-16">
          {products.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
}
