"use client";

import { useState } from "react";
import { toast } from "sonner";
import { uploadImage } from "@/lib/uploadImage";

export default function UploadTest() {
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = async () => {
    if (!file) return;

    try {
      const url = await uploadImage(file);
      console.log("Uploaded URL:", url);
      toast.success("Uploaded successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Upload failed");
    }
  };

  return (
    <div>
      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}
