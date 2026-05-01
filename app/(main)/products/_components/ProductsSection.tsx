"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import Image from "next/image";
import Sidebar from "./Sidebar";
import BackgroundTexture from "@/assets/background-texture-brown-long-1.svg";
import { ChevronDown } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { useEffect, useState } from "react";
import DropdownGeneric from "@/components/DropdownGeneric";

type Product = {
  _id: string;
  name: string;
  image: string;
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
    };

    fetchProducts();
  }, [filters, sortBy]);

  function handleSortChange(value: string) {
  setSortBy(value);
}

  return (
    <section className="relative flex w-full gap-4 px-[calc(100dvw/24)] py-24">
      <Image
        src={BackgroundTexture}
        alt="Background Texture"
        fill
        className="fixed inset-0 -z-10 object-cover opacity-5"
      />

      <Sidebar filters={filters} onFilterChange={setFilters} />

      <div className="flex min-h-full flex-1 flex-col gap-4">
        <div className="sticky top-33 z-20 flex items-center place-self-end rounded-2xl bg-[#E2DED3] transition-all ">
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

        <div className="flex flex-wrap justify-between gap-x-4 gap-y-16 p-2">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              id={product._id}
              image={product.image}
              title={product.name}
              description={product.description}
              price={product.price}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
