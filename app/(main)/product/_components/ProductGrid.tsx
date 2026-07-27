"use client";
import React, { useState, useEffect } from 'react'
import Image from "next/image";
type ProductGridProps = {
  product: {
    images?: string[];
    image?: string; // Fallback for older products
    name: string;
  };
};
export default function ProductGrid({ product }: ProductGridProps) {
  const imagesList = (product.images?.length ? product.images : (product.image ? [product.image] : [])).filter(Boolean);
  const [selectedImage, setSelectedImage] = useState<string>(imagesList[0] || "");
  useEffect(() => {
    function updateSelectedImage() {
      if (imagesList.length > 0 && !imagesList.includes(selectedImage)) {
        setSelectedImage(imagesList[0]);
      }
updateSelectedImage();
    }
  }, [product]);
  return (
    <div className="w-full ">
      <div className="image-grid flex h-[720px]  gap-12 flex-row-reverse items-start justify-start pr-12">
        {selectedImage ? (
          <div className="relative aspect-[3/4] w-9/10 h-7/8 overflow-hidden rounded-2xl">
            <Image 
              alt={product.name || "Product image"}
              src={selectedImage}
              fill
              priority
              sizes="(max-width: px) 100vw, 150vw"
              className="object-contain bg-zinc-200"
            />
          </div>
        ) : (
          <div className="flex aspect-[627/800] w-full items-center justify-center rounded-2xl bg-gray-200">
            No Image Available
          </div>
        )}
        {imagesList.length > 0 && (
          <div className="mt-12 flex w-fit  flex-col items-center justify-start gap-2 overflow-x-auto">
            {imagesList.slice(0, 4).map((imgUrl, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(imgUrl)}
                className={`active:border-foreground relative aspect-square w-64 max-w-[64px] cursor-pointer overflow-hidden rounded-lg border-2 transition-all ${
                  selectedImage === imgUrl
                    ? "border-primary-background"
                    : "border-transparent hover:border-gray-300"
                }`}
              >
                <Image loading="lazy"
                  src={imgUrl}
                  alt={`${product.name || "Product"} thumbnail ${idx + 1}`}
                  fill
                  sizes="(max-width: 768px) 25vw, 120px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
