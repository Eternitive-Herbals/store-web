"use client";

import { Upload, X } from "lucide-react";
import { useState } from "react";
import "@/app/globals.css";
import { uploadImage, deleteImage } from "@/lib/uploadImage";
import { toast } from "sonner";

export default function GenericModal({
  open,
  onClose,
  onCreate,
  title,
  description,  
  children,
  isImageUpload = false,
}: {
  open: boolean;
  onClose: () => void;
  onCreate: (value: string, imageUrl?: string) => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  isImageUpload?: boolean;
}) {
  const [value, setValue] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    try {
      const url = await uploadImage(file);
      if (url) {
        setPreviewUrl(url);
      }
    } catch (error) {
      console.error(error);
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }

    setFile(null);
  };

  const handleDelete = async () => {
    if (!previewUrl) return;

    setDeleting(true);
    try {
      await deleteImage(previewUrl);
      setPreviewUrl(null);
      setFile(null);
    } catch (error) {
      console.error(error);
      toast.error("Delete failed");
    } finally {
      setDeleting(false);
    }
  };

  if (!open) return null;

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
        <div className="flex relative items-center w-full h-fit gap-4 ">
          {previewUrl && (
            <div className="relative w-32 h-32 rounded-xl overflow-hidden border-2 border-foreground/20">
              <img
                src={previewUrl}
                alt="Preview"
                className="w-full h-full object-cover"
              />
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1 backdrop-blur-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <X size={16} />
              </button>
            </div>
          ) }

          {title && <h2 className="text-foreground mb-4 text-lg font-semibold">{title}</h2>}
      {description && <p className="text-foreground/60 mb-4 text-sm">{description}</p>}
            
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="border-foreground/20 border-dashed h-32 rounded-xl placeholder:text-center focus:border-foreground/60 w-full border-2 px-3 py-2 text-sm outline-none bg-[#f9f8f6] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-background/10 file:text-primary-background hover:file:bg-primary-background/20"
              />
              <button
                className="absolute bg-primary-background hover:bg-primary-background/90 text-background inset-0 w-fit mx-auto my-auto h-fit py-2 px-5 rounded-full text-sm font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                onClick={handleUpload}
                disabled={!file || uploading}
              >
                <Upload size={14} /> {uploading ? "Uploading..." : "Upload"}
              </button>
           
          
        </div>

        <h2 className="text-foreground mb-4 text-lg font-semibold">Category</h2>

        <input
          type="text"
          placeholder="Enter category name"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="border-foreground/20 focus:border-foreground/60 w-full rounded-lg border-2 px-3 py-2 text-sm outline-none"
        />

        <div className="mt-5 flex justify-end">
          <button
            onClick={() => {
              onCreate(value, previewUrl || undefined);
              setValue("");
              setFile(null);
              setPreviewUrl(null);
              onClose();
            }}
            className="bg-primary-background hover:bg-primary-background/90 group-data-[state=open]:bg-primary-background/90 flex items-center gap-2 rounded-full px-5 py-2 text-sm text-white transition-colors delay-75 duration-200 ease-in"
          >
            Create <span className="text-lg leading-none">+</span>
          </button>
        </div>
      </div>
    </div>
  );
}