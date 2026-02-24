"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Implement search logic here
  };

  return (
    <div className="items-centerjustify-start flex max-w-3xs gap-4 rounded-full bg-zinc-700/40 px-2 py-1">
      <div className="jsutify-center flex items-center">
        <Search size={20} className="text-white/90" color="white" />
      </div>

      <form
        onSubmit={handleSearch}
        className="flex items-center justify-center"
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search ..."
          className="border-none ring-0 outline-none placeholder:text-sm placeholder:font-light placeholder:text-white/90 focus:ring-0 focus:outline-none"
        />
      </form>
    </div>
  );
};

export default SearchBar;
