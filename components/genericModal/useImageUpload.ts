import { useState } from "react";
import { uploadImage, deleteImage } from "@/lib/uploadImage";

export function useImageUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    try {
      const url = await uploadImage(file);
      if (url) setPreviewUrl(url);
    } catch (err) {
      console.error(err);
      throw new Error("Upload failed");
    } finally {
      setUploading(false);
      setFile(null);
    }
  };

  const handleDelete = async () => {
    if (!previewUrl) return;

    setDeleting(true);
    try {
      await deleteImage(previewUrl);
      setPreviewUrl(null);
      setFile(null);
    } catch (err) {
      console.error(err);
      throw new Error("Delete failed");
    } finally {
      setDeleting(false);
    }
  };

  return {
    file,
    setFile,
    previewUrl,
    setPreviewUrl,
    uploading,
    deleting,
    handleUpload,
    handleDelete,
  };
}