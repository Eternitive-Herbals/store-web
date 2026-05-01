import React from 'react'
import Image from "next/image";

export default function ProductGrid({ product }: { product: any }) {
  if (!product) return null;

  // Use the main product image for the grid for now
  const imageSrc = typeof product.image === 'string' 
    ? (product.image.startsWith('http') 
        ? (product.image.includes('://') ? product.image : '/assets/products-sample-image-1.png') 
        : (product.image.startsWith('/') ? product.image : `/${product.image}`)) 
    : (product.image || '/assets/products-sample-image-1.png');

  return (
    <div className="max-w-xl w-full">
      <div className="image-grid flex flex-col items-center gap-3">
        <div className="relative w-full rounded-2xl overflow-hidden border border-foreground/10 aspect-square">
          <Image 
            alt={product.name} 
            src={imageSrc} 
            fill
            className="object-cover"
          />
        </div>
        <div className="flex w-full items-center justify-between gap-2 mt-2">
          {[1, 2, 3, 4].map((idx) => (
            <div key={idx} className="relative w-1/4 aspect-square rounded-xl overflow-hidden border border-foreground/5">
              <Image 
                src={imageSrc} 
                alt={`${product.name} thumbnail ${idx}`}
                fill
                className="object-cover opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
