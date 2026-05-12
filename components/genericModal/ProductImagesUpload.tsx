import { Upload, X } from "lucide-react";
import { toast } from "sonner";

type Props = {
  files: File[];
  setFiles: (files: File[]) => void;
  previewUrls: string[];
  uploading: boolean;
  deletingUrl: string | null;
  onUpload: () => void;
  onDelete: (url: string) => void;
  onRemoveFile: (index: number) => void;
};

export default function ProductImagesUpload({
  files,
  setFiles,
  previewUrls,
  uploading,
  deletingUrl,
  onUpload,
  onDelete,
  onRemoveFile,
}: Props) {
  const maxImages = 4;
  const currentTotal = files.length + previewUrls.length;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      if (currentTotal + newFiles.length > maxImages) {
        toast.error(`You can only have up to ${maxImages} images in total.`);
        const allowed = maxImages - currentTotal;
        setFiles([...files, ...newFiles.slice(0, allowed)]);
      } else {
        setFiles([...files, ...newFiles]);
      }
    }
    e.target.value = ''; // reset
  };

  return (
    <div className="flex relative items-center w-full h-fit gap-4 mb-4 flex-wrap">
      {/* Existing uploaded images */}
      {previewUrls.map((url, idx) => (
        <div key={url} className="relative w-16 h-16 rounded-xl overflow-hidden border-2 border-foreground/20 shrink-0">
          <img
            src={url}
            alt={`Preview ${idx + 1}`}
            className="w-full h-full object-cover"
          />
          <button
            onClick={() => onDelete(url)}
            disabled={deletingUrl === url}
            className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1 backdrop-blur-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <X size={16} />
          </button>
        </div>
      ))}

      {/* Selected files to upload */}
      {files.map((file, idx) => (
        <div key={idx} className="relative w-16  h-16 rounded-xl overflow-hidden border-2 border-blue-400 shrink-0">
          <img
            src={URL.createObjectURL(file)}
            alt={`File ${idx + 1}`}
            className="w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="bg-blue-500 text-white text-[10px] px-2 py-1 rounded-full shadow-md">Pending</span>
          </div>
          <button
            onClick={() => onRemoveFile(idx)}
            className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1 backdrop-blur-sm transition-colors cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>
      ))}

      {currentTotal < maxImages && (
        <div className="w-full relative min-w-[200px] flex-1">
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="border-foreground/20 border-dashed h-32 rounded-xl placeholder:text-center focus:border-foreground/60 w-full border-2 px-3 py-2 text-sm outline-none bg-[#f9f8f6] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-background/10 file:text-primary-background hover:file:bg-primary-background/20"
          />

          <button
            className="absolute bg-primary-background hover:bg-primary-background/90 text-background inset-0 w-fit left-1/2 -translate-x-1/2 my-auto h-fit py-2 px-5 rounded-full text-sm font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            onClick={onUpload}
            disabled={files.length === 0 || uploading}
          >
            <Upload size={14} />
            {uploading ? "Uploading..." : "Upload"}
          </button>
        </div>
      )}
    </div>
  );
}
