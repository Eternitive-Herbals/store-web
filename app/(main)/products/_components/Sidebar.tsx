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
  const [isOpen, setIsOpen] = useState(false);
  
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
  const FilterContent = () => (
    <>
      <div className="flex items-center gap-2">
        <ChevronsRight size={20} />
        <span className="text-lg">Categories</span>
      </div>
      <div className="mx-4 flex flex-col gap-1">
        {dbCategories.map((category) => (
          <label
            key={category._id}
            className="hover:text-primary-background flex cursor-pointer items-center gap-2 transition-colors"
          >
            <input
              type="checkbox"
              checked={filters.categories.includes(category.name)}
              onChange={() => handleCategoryChange(category.name)}
            />
            <span className="text-sm font-medium">{category.name}</span>
          </label>
        ))}
        {dbCategories.length === 0 && (
          <span className="text-xs text-slate-500 italic">No categories</span>
        )}
      </div>
      <div className="bg-foreground/25 my-2 h-px w-full rounded-full" />
      <div className="flex items-center gap-2">
        <ChevronsRight size={20} />
        <span className="text-lg">Goals</span>
      </div>
      <div className="mx-4 flex flex-col gap-1">
        {dbGoals.map((goal) => (
          <label
            key={goal._id}
            className="hover:text-primary-background flex cursor-pointer items-center gap-2 transition-colors"
          >
            <input
              type="checkbox"
              checked={filters.goals.includes(goal.name)}
              onChange={() => handleGoalChange(goal.name)}
            />
            <span className="text-sm font-medium">{goal.name}</span>
          </label>
        ))}
        {dbGoals.length === 0 && (
          <span className="text-xs text-slate-500 italic">No goals</span>
        )}
      </div>
    </>
  ); 
  return (
    
  <>
    {/* Mobile Button */}
    <button
      onClick={() => setIsOpen(true)}
      className="flex items-center gap-2 rounded-xl border h-fit  sticky top-33 z-50 w-fit border-white/10 bg-[#E2DED3] px-4 py-2 shadow lg:hidden"
    >
      <SlidersHorizontal size={20} />
      <span>Filter</span>
    </button>
    {/* Desktop Sidebar */}
    <div className="sticky top-33 hidden h-[calc(100dvh-11.25rem)] w-xs flex-col gap-2 rounded-[20px] border border-white/10 bg-[#E2DED3] p-4 backdrop-blur-2xl lg:flex">
      <div className="mb-2 flex items-center gap-2">
        <SlidersHorizontal size={22} />
        <span className="text-xl">Filter</span>
      </div>
      <FilterContent />
    </div>
    {/* Mobile Overlay */}
    {isOpen && (
      <>
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
        <div className="fixed left-4 right-4 top-20 z-50 max-h-[80vh] overflow-y-auto rounded-2xl border border-white/10 bg-[#E2DED3] p-4 shadow-2xl lg:hidden">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <SlidersHorizontal size={22} />
              <span className="text-xl">Filter</span>
            </div>
            <button onClick={() => setIsOpen(false)}>
              <X size={22} />
            </button>
          </div>
          <FilterContent />
        </div>
      </>
    )}
  </>
  );
}
