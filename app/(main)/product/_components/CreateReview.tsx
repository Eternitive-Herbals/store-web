"use client";

import React, { useRef, useState } from "react";
import { ImagePlus, StarIcon, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { createReview } from "@/lib/reviewAction";
import { uploadImage } from "@/lib/uploadImage";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Image from "next/image";

type CreateReviewProps = {
  productId: string;
  onReviewCreated: () => void;
};

export default function CreateReview({ productId, onReviewCreated }: CreateReviewProps) {
  const { user, isLoggedIn } = useAuth();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isWriting, setIsWriting] = useState(false);
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) {
      toast.error("Please write a review");
      return;
    }

    try {
      setLoading(true);

      let imageUrl: string | undefined;
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      await createReview({
        productId,
        rating,
        content,
        author: user?.username || "Anonymous",
        image: imageUrl,
      });
      toast.success("Review submitted!");
      setContent("");
      setRating(5);
      removeImage();
      setIsWriting(false);
      onReviewCreated();
    } catch (error: any) {
      toast.error(error.message || "Failed to submit review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-sf-pro-text mr-auto pt-4 pb-22">
      <h1 className="text-[28px] font-medium text-[#1B1B1B]">Review this Product</h1>
      <p className="font-regular text-[#4A5565] text-[20px] pb-4">
        Share your thoughts with other customers
      </p>

      {isWriting ? (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className="cursor-pointer"
              >
                <StarIcon
                  size={28}
                  className={
                    star <= (hoverRating || rating)
                      ? "fill-[#FFCC32] text-[#FFCC32]"
                      : "fill-[#E5E7EB] text-[#E5E7EB]"
                  }
                />
              </button>
            ))}
          </div>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your review here..."
            rows={4}
            className="w-full p-3 rounded-lg border border-[#E5E7EB] focus:border-primary-background/40 outline-none resize-none text-base"
            required
          />

          {/* Image Upload */}
          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            {imagePreview ? (
              <div className="relative w-40 h-40 rounded-lg overflow-hidden border border-[#E5E7EB]">
                <Image
                  src={imagePreview}
                  alt="Review preview"
                  fill
                  sizes="160px"
                  className="object-cover"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1 cursor-pointer hover:bg-black/80 transition-colors"
                >
                  <X size={14} />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 text-[#4A5565] hover:text-[#1B1B1B] transition-colors cursor-pointer text-sm"
              >
                <ImagePlus size={20} />
                Add a photo
              </button>
            )}
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => { setIsWriting(false); removeImage(); }}
              className="font-sf-pro-text text-[16px] font-medium rounded-full border border-[#1B1B1B] py-3 px-8 cursor-pointer hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="font-sf-pro-text text-[16px] font-medium bg-[#1B1B1B] rounded-full text-white py-3 px-8 cursor-pointer hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? "Submitting..." : "Submit Review"}
            </button>
          </div>
        </form>
      ) : (
        <button
          onClick={() => {
            if (!isLoggedIn) {
              router.push("/login");
              return;
            }
            setIsWriting(true);
          }}
          className='font-sf-pro-text text-[20px] font-medium bg-[#1B1B1B] rounded-full text-white py-4 px-13 cursor-pointer hover:opacity-90 transition-opacity'
        >
          Write a customer review
        </button>
      )}
    </div>
  );
}
