import { useEffect, useState } from "react";

export function useOrderFilters() {
  const [filters, setFilters] = useState<any>({
    status: "",
  });

  useEffect(() => {
    const saved = localStorage.getItem("orderFilters");
    if (saved) {
      try {
        setFilters(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse filters", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("orderFilters", JSON.stringify(filters));
  }, [filters]);

  return { filters, setFilters };
}
