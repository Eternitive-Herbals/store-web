"use client";

import { X } from "lucide-react";
import { useState } from "react";

export default function CategoryModal({
  open,
  onClose,
  onCreate,
}: {
  open: boolean;
  onClose: () => void;
  onCreate: (value: string) => void;
}) {
  const [value, setValue] = useState("");

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* :small_blue_diamond: Overlay */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* :small_blue_diamond: Modal */}
      <div className="relative w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-0 -right-10 rounded-full p-1 hover:bg-gray-100"
        >
          <X size={18} />
        </button>

        {/* Title */}
        <h2 className="mb-4 text-lg font-semibold text-gray-900">Category</h2>

        {/* Input */}
        <input
          type="text"
          placeholder="Enter category name"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-gray-400"
        />

        {/* Button */}
        <div className="mt-5 flex justify-end">
          <button
            onClick={() => {
              onCreate(value);
              setValue("");
              onClose();
            }}
            className="flex items-center gap-2 rounded-full bg-black px-5 py-2 text-sm text-white hover:bg-gray-900"
          >
            Create <span className="text-lg leading-none">+</span>
          </button>
        </div>
      </div>
    </div>
  );
}