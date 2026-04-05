import { ChevronsRight, SlidersHorizontal } from "lucide-react";

export default function Sidebar() {
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
            <input type="checkbox" name="supplement" id="supplement" />
            <span>Supplement</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" name="supplement" id="supplement" />
            <span>Powder</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" name="supplement" id="supplement" />
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
            <input type="checkbox" name="supplement" id="supplement" />
            <span>General Health</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" name="supplement" id="supplement" />
            <span>Fitness</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" name="supplement" id="supplement" />
            <span>Heart</span>
          </label>
        </div>
      </div>
    </div>
  );
}
