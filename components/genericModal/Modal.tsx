"use client";

import { X } from "lucide-react";
import { useState, useEffect } from "react";
import "@/app/globals.css";
import ImageUpload from "./ImageUpload";
import { useImageUpload } from "./useImageUpload";

export default function Modal({
  open,
  onClose,
  onCreate,
  isImageUpload = false,
  hasDescription = false,
  title,
  initialData,
}: {
  open: string | boolean;
  onClose: () => void;
  onCreate: (value: string, imageUrl?: string, description?: string) => void;
  isImageUpload?: boolean;
  hasDescription?: boolean;
  title: string;
  initialData?: { name?: string; image?: string; description?: string } | null;
}) {
  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");

  const {
    file,
    setFile,
    previewUrl,
    setPreviewUrl,
    uploading,
    deleting,
    handleUpload,
    handleDelete,
  } = useImageUpload();

  useEffect(() => {
    if (open && initialData) {
      setValue(initialData.name || "");
      setDescription(initialData.description || "");
      setPreviewUrl(initialData.image || null);
    } else if (open) {
      // Reset when creating new
      setValue("");
      setDescription("");
      setPreviewUrl(null);
      setFile(null);
    }
  }, [open, initialData, setPreviewUrl, setFile]);

  if (!open) return null;

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();

    if (!value.trim() || uploading) return;

    onCreate(
      value,
      previewUrl || undefined,
      hasDescription ? description : undefined
    );

    onClose();
  };

  const isEdit = !!initialData;

  const showImageUpload =
    isImageUpload ||
    (typeof open === "string" &&
      (open.includes("ingredient") || open.includes("goal")));

  return (
    <div className="text-sf-pro-text fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="bg-foreground/5 absolute inset-0 backdrop-blur-sm"
        onClick={onClose}
      />

      <form
        onSubmit={handleCreate}
        onClick={(e) => e.stopPropagation()} // ✅ prevent close on inside click
        className="relative w-full max-w-md rounded-xl bg-white p-2 shadow-lg"
      >
        <button
          type="button"
          onClick={onClose}
          className="bg-foreground/60 absolute top-0 -right-10 rounded-full p-1"
        >
          <X size={18} color="background" />
        </button>

        {showImageUpload && (
          <ImageUpload
            file={file}
            setFile={setFile}
            previewUrl={previewUrl}
            uploading={uploading}
            deleting={deleting}
            onUpload={handleUpload}
            onDelete={handleDelete}
          />
        )}

        <h2 className="text-foreground mb-4 text-lg font-semibold">
          {isEdit ? `Edit ${title}` : `Add New ${title}`}
        </h2>

        <input
          type="text"
          placeholder={`Enter ${title?.toLowerCase()} name`}
          value={value}
          required
          onChange={(e) => setValue(e.target.value)}
          className="border-foreground/20 focus:border-foreground/60 w-full rounded-lg border-2 px-3 py-2 text-sm outline-none mb-4"
        />

        {hasDescription && (
          <textarea
            placeholder={`Enter ${title.toLowerCase()} description`}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="border-foreground/20 focus:border-foreground/60 w-full rounded-lg border-2 px-3 py-2 text-sm outline-none mb-4"
          />
        )}

        <div className="mt-5 flex justify-end">
          <button
            type="submit"
            disabled={uploading || deleting} // ✅ improved safety
            className="bg-primary-background hover:bg-primary-background/90 group-data-[state=open]:bg-primary-background/90 flex items-center gap-2 rounded-full px-5 py-2 text-sm text-white transition-colors delay-75 duration-200 ease-in disabled:opacity-50"
          >
            {isEdit ? "Update" : "Create"}{" "}
            {isEdit ? "" : <span className="text-lg leading-none">+</span>}
          </button>
        </div>
      </form>
    </div>
  );
}