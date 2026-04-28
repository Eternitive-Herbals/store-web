"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import "@/app/globals.css";

type DropdownGenericProps = {
  options: string[];
  value?: string;
  placeholder?: string;
  allOptionsLabel?: string;
  onChange?: (value: string) => void;
  className?: string;
};

export default function DropdownGeneric({
  options,
  value,
  placeholder = "All",
  allOptionsLabel = "All",
  onChange,
  className = "",
}: DropdownGenericProps) {
  const [open, setOpen] = useState(false);
  
  // Set default selected to value if provided, else the first option
  const [selected, setSelected] = useState(value);
  const ref = useRef<HTMLDivElement>(null);

  // Sync internal state if the value prop changes from outside
  useEffect(() => {
    if (value !== undefined) {
      setSelected(value);
    }
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (item: string) => {
    setSelected(item);
    onChange?.(item);
    setOpen(false);
  };

  return (
    <div ref={ref} className={`relative w-fit font-sf-pro-text text-sm `}>
      
      <button
        onClick={() => setOpen((prev) => !prev)}
        className={`flex w-full items-center justify-between gap-2 rounded-full ${className? className : "bg-primary-background text-foreground"}  px-4 py-2.5 hover:border-foreground/60 focus:border-foreground/60 transition-colors outline-none`}
        type="button"
      >
        <span className={selected ? "" : "text-background/50 capitalize"}>
          {selected ? `${selected.charAt(0).toUpperCase() + selected.slice(1)}` : placeholder}
        </span>
        <span className={`transition-transform ease-in duration-300 ${open ? "rotate-180" : ""}`}>
          <ChevronDown className="size-5 " />
        </span>
      </button>

      {/* Menu */}
      {open && (
        <div className="absolute z-10 mt-1.5 w-fit left-1/2 -translate-x-1/2 rounded-xl text-nowrap p-1 border border-foreground/10 bg-white overflow-hidden shadow-lg">
          <div className="max-h-60 overflow-y-auto">
            <div
              onClick={() => handleSelect("")}
              className={`cursor-pointer px-4 py-2.5 hover:bg-gray-100 transition-colors duration-200 ${
                !selected ? "bg-gray-50 font-medium" : ""
              }`}
            >
              {allOptionsLabel}
            </div>
            {options.length > 0 && (
              options.map((item) => (
                <div
                  key={item}
                  onClick={() => handleSelect(item)}
                  className={`cursor-pointer capitalize px-4 py-2.5 hover:bg-gray-100 transition-colors duration-200 ${
                    selected === item ? "bg-gray-50 font-medium" : ""
                  }`}
                >
                  {item}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
