import { useEffect, useState } from "react";
import { ProductType } from "@/types/ProductType";

export function useProducts(filters: any, sortBy: string, refreshKey: number) {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const params = new URLSearchParams();

        if (filters.goals.length > 0) {
          params.append("goals", filters.goals.join(","));
        }
        if (filters.categories.length > 0) {
          params.append("categories", filters.categories.join(","));
        }

        params.append("sortBy", sortBy);

        const res = await fetch(`/api/search?${params.toString()}`);
        const data = await res.json();

        setProducts(data.products || []);
      } catch (error) {
        console.error("Fetch failed:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filters, sortBy, refreshKey]);

  return { products, loading };
}