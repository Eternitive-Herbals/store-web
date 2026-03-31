"use client";
import { ChevronDown } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";

type DropdownProps = {
  options: string[];
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  className?: string;
};

export default function Dropdown({
  options,
  value = "4 weeks",
  placeholder = value,
  onChange,
  className = "",
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(value || "");
  const ref = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleSelect = (item: string) => {
    setSelected(item);
    onChange?.(item);
    setOpen(false);
  };

  return (
    <div ref={ref} className={`relative w-full font-sf-pro-text text-xl mr-2 ${className}`}>
      
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between rounded-lg border font-regular px-4 gap-4 py-2"
      >
        <span>{selected || placeholder}</span>
        <span className={`transition-transform ${open ? "rotate-180" : ""}`}>
         <ChevronDown className="size-6" color="black" />
        </span>
      </button>

      {/* Menu */}
      {open && (
        <div className="absolute z-10 mt-2 w-full rounded-xl border bg-white overflow-hidden shadow-md">
          {options.map((item) => (
            <div
              key={item}
              onClick={() => handleSelect(item)}
              className="cursor-pointer px-4 py-2 hover:bg-gray-100 transition-colors duration-400 ease-in " 
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}