import { ChevronsRight, SlidersHorizontal, X } from "lucide-react";
import { useState } from "react";

type SidebarProps = {
  onFilterChange: (filters: { goals: string[]; categories: string[] }) => void;
};
export default function Sidebar({ onFilterChange }: SidebarProps) {
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  
  const handleGoalChange = (value: string) => {
    const updated = selectedGoals.includes(value)
      ? selectedGoals.filter((g) => g !== value)
      : [...selectedGoals, value];

    setSelectedGoals(updated);
    onFilterChange({ goals: updated, categories: selectedCategories });
  };

  const handleCategoryChange = (value: string) => {
    const updated = selectedCategories.includes(value)
      ? selectedCategories.filter((c) => c !== value)
      : [...selectedCategories, value];

    setSelectedCategories(updated);
    onFilterChange({ goals: selectedGoals, categories: updated });
  };
  return (
    <div className="sticky top-33 flex h-[calc(100dvh-11.25rem)] w-xs flex-col gap-2 rounded-[20px] border border-white/10 bg-[#E2DED3] p-4 backdrop-blur-2xl">
      <div className="flex items-center gap-2">
        <SlidersHorizontal size={22} />
        <span className="text-xl">Filter</span>
      </div>

      <div className="bg-foreground/25 min-h-0.5 w-full rounded-full" />

      <div className="flex flex-col items-start gap-2">
        <div className="flex items-center gap-2">
          <ChevronsRight size={20} />
          <span className="text-lg">Type</span>
        </div>

        <div className="mx-4 flex flex-col">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="supplement"
              id="supplement"
              onChange={() => handleCategoryChange("Supplement")}
            />
            <span>Supplement</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="supplement"
              id="supplement"
              onChange={() => handleCategoryChange("Powder")}
            />
            <span>Powder</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="supplement"
              id="supplement"
              onChange={() => handleCategoryChange("Gummies")}
            />
            <span>Gummies</span>
          </label>
        </div>

        <div className="bg-foreground/25 min-h-0.5 w-full rounded-full" />

        <div className="flex items-center gap-2">
          <ChevronsRight size={20} />
          <span className="text-lg">Category</span>
        </div>

        <div className="mx-4 flex flex-col">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="supplement"
              id="supplement"
              onChange={() => handleGoalChange("General-Health")}
            />
            <span>General Health</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="supplement"
              id="supplement"
              onChange={() => handleGoalChange("Fitness")}
            />
            <span>Fitness</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="supplement"
              id="supplement"
              onChange={() => handleGoalChange("Heart")}
            />
            <span>Heart</span>
          </label>
        </div>
      </div>
    </div>
  );
}
