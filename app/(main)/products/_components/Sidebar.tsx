import { ChevronsRight, SlidersHorizontal, X } from "lucide-react";
import { useState, useEffect } from "react";
import { getAllCategories } from "@/lib/categoryAction";
import { getAllGoals } from "@/lib/goalAction";

type SidebarProps = {
  filters: { goals: string[]; categories: string[] };
  onFilterChange: (filters: { goals: string[]; categories: string[] }) => void;
};
export default function Sidebar({ filters, onFilterChange }: SidebarProps) {
  const [dbCategories, setDbCategories] = useState<any[]>([]);
  const [dbGoals, setDbGoals] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categories = await getAllCategories();
        const goals = await getAllGoals();
        setDbCategories(categories || []);
        setDbGoals(goals || []);
      } catch (error) {
        console.error("Failed to fetch filters:", error);
      }
    };
    fetchData();
  }, []);
  
  const handleGoalChange = (value: string) => {
    const updated = filters.goals.includes(value)
      ? filters.goals.filter((g) => g !== value)
      : [...filters.goals, value];

    onFilterChange({ ...filters, goals: updated });
  };

  const handleCategoryChange = (value: string) => {
    const updated = filters.categories.includes(value)
      ? filters.categories.filter((c) => c !== value)
      : [...filters.categories, value];

    onFilterChange({ ...filters, categories: updated });
  };
  return (
    <div className="sticky top-33 flex h-[calc(100dvh-11.25rem)] w-xs flex-col gap-2 rounded-[20px] border border-white/10 bg-[#E2DED3] p-4 backdrop-blur-2xl">
      <div className="flex items-center gap-2">
        <SlidersHorizontal size={22} />
        <span className="text-xl">Filter</span>
      </div>

      <div className="bg-foreground/25 min-h-0.5 w-full rounded-full" />

      <div className="flex flex-col items-start gap-2 overflow-y-auto pr-2 custom-scrollbar">
        <div className="flex items-center gap-2">
          <ChevronsRight size={20} />
          <span className="text-lg">Categories</span>
        </div>

        <div className="mx-4 flex flex-col gap-1">
          {dbCategories.map((category) => (
            <label key={category._id} className="flex items-center gap-2 cursor-pointer hover:text-primary-background transition-colors">
              <input
                type="checkbox"
                name={`cat-${category.name}`}
                id={`cat-${category._id}`}
                checked={filters.categories.includes(category.name)}
                onChange={() => handleCategoryChange(category.name)}
                className="cursor-pointer"
              />
              <span className="text-sm font-medium">{category.name}</span>
            </label>
          ))}
          {dbCategories.length === 0 && <span className="text-xs text-slate-500 italic">No categories</span>}
        </div>

        <div className="bg-foreground/25 my-2 min-h-0.5 w-full rounded-full" />

        <div className="flex items-center gap-2">
          <ChevronsRight size={20} />
          <span className="text-lg">Goals</span>
        </div>

        <div className="mx-4 flex flex-col gap-1">
          {dbGoals.map((goal) => (
            <label key={goal._id} className="flex items-center gap-2 cursor-pointer hover:text-primary-background transition-colors">
              <input
                type="checkbox"
                name={`goal-${goal.name}`}
                id={`goal-${goal._id}`}
                checked={filters.goals.includes(goal.name)}
                onChange={() => handleGoalChange(goal.name)}
                className="cursor-pointer"
              />
              <span className="text-sm font-medium">{goal.name}</span>
            </label>
          ))}
          {dbGoals.length === 0 && <span className="text-xs text-slate-500 italic">No goals</span>}
        </div>
      </div>
    </div>
  );
}
