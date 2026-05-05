import { useEffect, useState } from "react";
import { getAllCategories } from "@/lib/categoryAction";
import { getAllGoals } from "@/lib/goalAction";

export function useMeta() {
  const [categories, setCategories] = useState<string[]>([]);
  const [goals, setGoals] = useState<string[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const cats = await getAllCategories();
        const goals = await getAllGoals();

        setCategories(cats.map((c: any) => c.name));
        setGoals(goals.map((g: any) => g.name));
      } catch (err) {
        console.error(err);
      }
    }

    fetchData();
  }, []);

  return { categories, goals, setCategories, setGoals };
}