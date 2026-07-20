"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import Image from "next/image";
import Sidebar from "./Sidebar";
import BackgroundTexture from "@/assets/background-texture-brown-long-1.svg";
import { ChevronDown } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { useEffect, useState } from "react";
import DropdownGeneric from "@/components/DropdownGeneric";

export type Product = {
  _id: string;
  name: string;
  image?: string;
  images?: string[];
  description: string;
  price: number;
  ingredients?: { name: string }[];
  goal?: { name: string }[];
};

export type Filters = {
  goals: string[];
  categories: string[];
};

export default function ProductsSection() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoading,setisLoading] = useState(false);
  const [sortBy, setSortBy] = useState(searchParams.get("sortBy") || "featured");
  const [filters, setFilters] = useState<Filters>({
    goals: searchParams.get("goals")?.split(",").filter(Boolean) || [],
    categories: searchParams.get("categories")?.split(",").filter(Boolean) || [],
  });

  const [products, setProducts] = useState<Product[]>([]);
useEffect(() => {
  const params = new URLSearchParams();

  if (filters.goals.length > 0) {
    params.set("goals", filters.goals.join(","));
  }

  if (filters.categories.length > 0) {
    params.set("categories", filters.categories.join(","));
  }

  if (sortBy && sortBy !== "featured") {
    params.set("sortBy", sortBy);
  }

  const newQuery = params.toString();
  const currentQuery = searchParams.toString();

  if (newQuery !== currentQuery) {
    router.replace(`${pathname}?${newQuery}`, { scroll: false });
  }
}, [filters, sortBy, pathname, router]);


  useEffect(() => {
   
    const fetchProducts = async () => {
       setisLoading(false);
      const params = new URLSearchParams();

      if (filters.goals.length > 0) {
        params.append("goals", filters.goals.join(","));
      }

      if (filters.categories.length > 0) {
        params.append("categories", filters.categories.join(","));
      }

      if (sortBy) {
        params.append("sortBy", sortBy);
      }

      const res = await fetch(`/api/search?${params.toString()}`);
      const data = await res.json();

      setProducts(data.products || []);
      setisLoading(true)
    };

    fetchProducts();
  }, [filters, sortBy]);

  function handleSortChange(value: string) {
  setSortBy(value);
}

  return (
    <>
      <section className="relative flex w-full px-2 py-24 md:gap-4">
        <Image
          loading="lazy"
          src={BackgroundTexture}
          alt="Background Texture"
          fill
          sizes="100vw"
          className="fixed inset-0 -z-10 object-cover opacity-5"
        />

        <Sidebar filters={filters} onFilterChange={setFilters} />

        <div className="z-0 flex min-h-full w-fit flex-1 -translate-x-[20%] flex-col gap-4 md:translate-0">
          <div className="sticky top-33 z-20 flex items-center place-self-end rounded-2xl bg-[#E2DED3] transition-all">
            <DropdownGeneric
              options={[
                "featured",
                "best_selling",
                "price_low_high",
                "price_high_low",
              ]}
              value={sortBy}
              onChange={handleSortChange}
              className="bg-[#E2DED3]"
            />
          </div>

          {!isLoading ? (
            <div className="flex w-sm flex-wrap justify-between gap-x-1 gap-y-4 md:w-full md:justify-start md:gap-x-4 md:gap-y-16">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className={`md:rounded-4xl aspect-2/3  max-h-[25rem]  w-[48%] animate-pulse flex-col overflow-hidden rounded-xl border border-white/10 bg-zinc-400 transition-transform duration-300 ease-initial md:aspect-3/4 md:w-2xs  delay-${i * 0.4} rounded-4xl`}
                />
              ))}
            </div>
          ) : (
            <div className="flex w-sm flex-wrap justify-between gap-x-1 gap-y-4 md:w-full md:justify-start md:gap-x-4 md:gap-y-16">
              {products.map((product, idx) => (
                <ProductCard
                  key={product._id || idx}
                  id={product._id}
                  image={product.images?.[0] || product.image || ""}
                  title={product.name}
                  description={product.description}
                  price={product.price}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
