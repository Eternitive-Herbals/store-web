"use client"
import Image from "next/image";
import BackgroundTexture from "@/assets/background-texture-brown-long-1.svg";
import FeaturedProductCard from "./FeaturedProductCard";
import { useEffect,useState } from "react";
import { Product } from "../../products/_components/ProductsSection";

export default function FeaturedProductsSection() {
const [products,setProducts] = useState<Product[]>([])
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products/featuredProducts");

        if (!response.ok) {
          throw new Error("Failed to fetch");
        }

        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);
 

  return (
    <section className=" h-fit md:h-[230dvh] relative flex snap-start flex-col items-start sm:items-center text-left sm:text-center gap-6 sm:gap-16 px-4 sm:px-24 py-20 sm:py-48">
      <Image loading="lazy"
        src={BackgroundTexture}
        alt="Background Texture"
        fill
        sizes="100vw"
        className="-z-10 object-cover opacity-5"
      />

      <span className="font-comfortaa mb-10 sm:mb-16 text-4xl font-bold">
        Our Best Sellers
      </span>

      {products.map((product) => (
        <FeaturedProductCard
          key={product._id}
          name={product.name}
          image={product.images?.[0] || ""}
          description={product.description}
          price={product.price}
          href={`/product/${product._id}`}
        />
      ))} 
    </section>
  );
}
