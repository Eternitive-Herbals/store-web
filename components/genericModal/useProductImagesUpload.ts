import { useState } from "react";
import { uploadImage, deleteImage } from "@/lib/uploadImage";

export function useProductImagesUpload() {
  const [files, setFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [deletingUrl, setDeletingUrl] = useState<string | null>(null);

  const handleUpload = async () => {
    if (files.length === 0) return;

    setUploading(true);
    try {
      const uploadPromises = files.map(file => uploadImage(file));
      const urls = await Promise.all(uploadPromises);
      setPreviewUrls(prev => [...prev, ...urls]);
      setFiles([]);
    } catch (err) {
      console.error(err);
      throw new Error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (url: string) => {
    setDeletingUrl(url);
    try {
      await deleteImage(url);
      setPreviewUrls(prev => prev.filter(u => u !== url));
    } catch (err) {
      console.error(err);
      throw new Error("Delete failed");
    } finally {
      setDeletingUrl(null);
    }
  };

  const handleRemoveFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  return {
    files,
    setFiles,
    previewUrls,
    setPreviewUrls,
    uploading,
    deletingUrl,
    handleUpload,
    handleDelete,
    handleRemoveFile
  };
}
