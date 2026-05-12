import { Upload, X } from "lucide-react";

type Props = {
  file: File | null;
  setFile: (file: File | null) => void;
  previewUrl: string | null;
  uploading: boolean;
  deleting: boolean;
  onUpload: () => void;
  onDelete: () => void;
};

export default function ImageUpload({
  file,
  setFile,
  previewUrl,
  uploading,
  deleting,
  onUpload,
  onDelete,
}: Props) {
  return (
    <div className="flex relative items-center w-full h-fit gap-4 mb-4">
      {previewUrl && (
        <div className="relative w-32 h-32 rounded-xl overflow-hidden border-2 border-foreground/20">
          <img
            src={previewUrl}
            alt="Preview"
            className="w-full h-full object-cover"
          />
          <button
            onClick={onDelete}
            disabled={deleting}
            className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1 backdrop-blur-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <X size={16} />
          </button>
        </div>
      )}
      <div className="w-full relative" >
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="border-foreground/20 border-dashed h-32 rounded-xl placeholder:text-center focus:border-foreground/60 w-full border-2 px-3 py-2 text-sm outline-none bg-[#f9f8f6] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-background/10 file:text-primary-background hover:file:bg-primary-background/20"
      />

      <button
        className="absolute bg-primary-background hover:bg-primary-background/90 text-background inset-0 w-fit left-1/2 -translate-x-1/2 my-auto h-fit py-2 px-5 rounded-full text-sm font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        onClick={onUpload}
        disabled={!file || uploading}
      >
        <Upload size={14} />
        {uploading ? "Uploading..." : "Upload"}
      </button>
      </div>
    </div>
  );
}