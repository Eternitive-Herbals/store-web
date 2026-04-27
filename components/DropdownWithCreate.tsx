"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Plus } from "lucide-react";
import Modal from "@/components/genericModal/Modal";
import "@/app/globals.css";


type DropdownWithCreateProps = {
  options: string[];
  value?: string;
  placeholder?: string;
  allOptionsLabel?: string;
  onChange?: (value: string) => void;
  onCreate?: (value: string, imageUrl?: string) => void;
  isImageUpload?: boolean;
  className?: string;
};

export default function DropdownWithCreate({
  options,
  value,
  placeholder = "All",
  allOptionsLabel = "All",
  onChange,
  onCreate,
  isImageUpload = false,
  className = "",
}: DropdownWithCreateProps) {
  const [open, setOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
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
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleSelect = (item: string) => {
    setSelected(item);
    onChange?.(item);
    setOpen(false);
  };

  const handleCreate = async (newValue: string, imageUrl?: string) => {
    // Notify parent about creation
    if(onCreate){
      await onCreate(newValue, imageUrl);
      setSelected(newValue);
      onChange?.(newValue);
    }
  };


  return (
    <div ref={ref} className={`relative w-fit   font-sf-pro-text text-sm ${className}`}>
      
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between gap-2  rounded-full bg-primary-background px-4 py-2.5 hover:border-foreground/60 focus:border-foreground/60 transition-colors outline-none"
        type="button"
      >
        <span className={selected ? "text-background" : "text-background/50"}>
          {selected ? `${selected}` : placeholder}
        </span>
        <span className={`transition-transform ease-in duration-300 ${open ? "rotate-180" : ""}`}>
          <ChevronDown className="size-5 text-background" />
        </span>
      </button>

      {/* Menu */}
      {open && (
        <div className="absolute z-10 mt-1.5 w-fit  left-1/2 -translate-x-1/2  rounded-xl text-nowrap p-1  border border-foreground/10 bg-white overflow-hidden shadow-lg">
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
                  className={`cursor-pointer px-4 py-2.5 hover:bg-gray-100 transition-colors duration-200 ${
                    selected === item ? "bg-gray-50 font-medium" : ""
                  }`}
                >
                  {item}
                </div>
              ))
            )}
          </div>
          
          <div className="border-t border-foreground/10 p-2 bg-gray-50/50">
            <button
              onClick={() => {
                setOpen(false);
                setIsModalOpen(true);
              }}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary-background hover:bg-primary-background/90 px-4 py-2 text-sm font-medium text-white transition-colors"
              type="button"
            >
               Create New <span className="text-lg leading-none">+</span>
            </button>
          </div>
        </div>
      )}

      {/* Embedded Modal */}
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreate}
        isImageUpload={isImageUpload}
      />
    </div>
  );
}
