import { ChevronRight } from 'lucide-react';
import React from 'react'

export default function OrderCard() {

  const prodCount = 5
  return (
    <div className="justfy-between flex h-fit w-full items-center gap-5 rounded-2xl bg-[#F9F8F6] p-5">
      <div className="flex items-center gap-2 ">
        {Array(3)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="size-21 rounded-xl bg-gray-700" />
          ))}
        <div className="bg-primary-background flex size-10 items-center justify-center rounded-full">
          <h1 className="font-bold text-white">
            {"+"}
            {prodCount - 3}
          </h1>
        </div>
      </div>

      <div className="bg-primary-background/20 h-16 w-0.5" />
      <div className="flex w-full items-start justify-between">
        <div className="font-sf-pro-text text-primary-background text-left text-lg">
          <h1 className="font-semibold">OrderId</h1>
          <p className="font-regular text-primary-background/40">
            Deliver on Date
          </p>
        </div>

        <button className='my-auto'>
          <ChevronRight
            size={20}
            className="text-primary-background "
          />
        </button>
      </div>
    </div>
  );
}
