"use client";

import { X } from "lucide-react";
import { useState } from "react";
import "@/app/globals.css";
import ImageUpload from "./ImageUpload";
import { useImageUpload } from "./useImageUpload";

export default function Modal({
  open,
  onClose,
  onCreate,
  isImageUpload = false,
}: {
  open: boolean;
  onClose: () => void;
  onCreate: (value: string, imageUrl?: string) => void;
  isImageUpload?: boolean;
}) {
  const [value, setValue] = useState("");

  const {
    file,
    setFile,
    previewUrl,
    uploading,
    deleting,
    handleUpload,
    handleDelete,
  } = useImageUpload();

  if (!open) return null;

  const handleCreate = () => {
    onCreate(value, previewUrl || undefined);
    setValue("");
    setFile(null);
    onClose();
  };

  return (
    <div className="text-sf-pro-text fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="bg-foreground/5 absolute inset-0 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-md rounded-xl bg-white p-2 shadow-lg">
        <button
          onClick={onClose}
          className="bg-foreground/60 absolute top-0 -right-10 rounded-full p-1"
        >
          <X size={18} color="background" />
        </button>
{isImageUpload &&
(<ImageUpload
          file={file}
          setFile={setFile}
          previewUrl={previewUrl}
          uploading={uploading}
          deleting={deleting}
          onUpload={handleUpload}
          onDelete={handleDelete}
        />)
}
        

        <h2 className="text-foreground mb-4 text-lg font-semibold">
          Category
        </h2>

        <input
          type="text"
          placeholder="Enter category name"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="border-foreground/20 focus:border-foreground/60 w-full rounded-lg border-2 px-3 py-2 text-sm outline-none"
        />

        <div className="mt-5 flex justify-end">
          <button
            onClick={handleCreate}
            className="bg-primary-background hover:bg-primary-background/90 group-data-[state=open]:bg-primary-background/90 flex items-center gap-2 rounded-full px-5 py-2 text-sm text-white transition-colors delay-75 duration-200 ease-in"
          >
            Create <span className="text-lg leading-none">+</span>
          </button>
        </div>
      </div>
    </div>
  );
}