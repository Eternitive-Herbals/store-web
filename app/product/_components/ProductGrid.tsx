import React from 'react'
import Image, { StaticImageData } from "next/image";

  type prodGrid = {
    name:string,href:StaticImageData,
  }
type gridImage = {
    prod: StaticImageData   ,
    sqImage: prodGrid[]
}

export default function ProductGrid( {prod, sqImage}:gridImage) {


    console.log(sqImage)
  return (
    <div>
      <div className="image-grid flex flex-col items-center gap-3">
        <div className="relative w-full">
          <Image alt="Product Image" src={prod} width={627} />
        </div>
        <div className="flex w-full items-center justify-between">
          {sqImage.map((p, idx) => (
            <div key={idx} className="">
              <Image src={p.href} alt={p.name} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
