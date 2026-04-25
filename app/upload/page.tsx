"use client";

import { useState } from "react";
import { uploadImage } from "@/lib/uploadImage";

export default function UploadTest() {
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = async () => {
    if (!file) return;

    try {
      const url = await uploadImage(file);
      console.log("Uploaded URL:", url);
      alert("Uploaded successfully!");
    } catch (err) {
      console.error(err);
      alert("Upload failed");
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
