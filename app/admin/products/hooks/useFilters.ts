import { useEffect, useState } from "react";
import { Filters } from "@/app/(main)/products/_components/ProductsSection";

export function useFilters() {
  const [filters, setFilters] = useState<Filters>({
    goals: [],
    categories: [],
  });

  useEffect(() => {
    const saved = localStorage.getItem("productFilters");
    if (saved) {
      try {
        setFilters(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse filters", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("productFilters", JSON.stringify(filters));
  }, [filters]);

  return { filters, setFilters };
}