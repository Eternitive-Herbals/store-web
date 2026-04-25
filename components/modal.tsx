"use client";

import { Upload, X } from "lucide-react";
import { useState } from "react";
import "@/app/globals.css";
import { uploadImage } from "@/lib/uploadImage";

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
  // const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);


 const handleUpload = async () => {
  if (!file) return;

  try {
    const url = await uploadImage(file);
    return url && console.log("Uploaded URL:", url);

    
  } catch (error) {
    console.error(error);
    alert("Upload failed");
    
  }
 }




  if (!open) return null;

  return (
    <div className="text-sf-pro-text fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="bg-background/5 absolute inset-0 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-md rounded-xl bg-white p-2">
        <button
          onClick={onClose}
          className="bg-foreground/60 absolute top-0 -right-10 rounded-full p-1"
        >
          <X size={18} color="background" />
        </button>
        <div className="flex relative items-center w-full h-fit ">
          <input
            type="file"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="border-foreground/20 border-dashed h-30 rounded-3xl placeholder:text-center focus:border-foreground/60 w-full border-2 px-3 py-2 text-sm outline-none bg-[#f9f8f6]"
          />
          <button  className=" absolute bg-primary-background hover:bg-primary-background/90 text-background inset-0 w-fit mx-auto my-auto h-fit py-1 px-4 rounded-full text-xs flex items-center gap-2" onClick={handleUpload}> <Upload size={12}/> Upload</button>
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
              onCreate(value);
              setValue("");
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