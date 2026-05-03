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
    if (imagesList.length > 0 && !imagesList.includes(selectedImage)) {
      setSelectedImage(imagesList[0]);
    }
  }, [product]);

  return (
    <div className="w-full max-w-xl">
      <div className="image-grid flex flex-col items-center gap-3">
        {selectedImage ? (
          <div className="relative w-full aspect-[627/800] rounded-2xl overflow-hidden">
            <Image
              alt={product.name || "Product image"}
              src={selectedImage}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        ) : (
          <div className="w-full aspect-[627/800] bg-gray-200 rounded-2xl flex items-center justify-center">
            No Image Available
          </div>
        )}
        
        {imagesList.length > 0 && (
          <div className="flex w-full items-center justify-start gap-2 overflow-x-auto">
            {imagesList.slice(0, 4).map((imgUrl, idx) => (
              <button 
                key={idx} 
                onClick={() => setSelectedImage(imgUrl)}
                className={`relative aspect-square w-1/4 max-w-[120px] overflow-hidden rounded-lg border-2 transition-all cursor-pointer ${
                  selectedImage === imgUrl ? 'border-primary-background' : 'border-transparent hover:border-gray-300'
                }`}
              >
                <Image
                  src={imgUrl}
                  alt={`${product.name || 'Product'} thumbnail ${idx + 1}`}
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
