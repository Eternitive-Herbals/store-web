import { Search } from "lucide-react";

export default function TableSearch({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) {
  return (
    <div className="relative max-w-sm flex-1">
      <Search
        size={18}
        className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
      />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search all columns..."
        className="w-full rounded-lg border px-10 py-2.5 text-sm"
      />
    </div>
  );
}
