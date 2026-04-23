import React from 'react'

export default function CreateReview() {
  return (
    <div className="font-sf-pro-text mr-auto pt-4 pb-22">
      <h1 className="text-[28px] font-medium text-[#1B1B1B]">Review this Product</h1>
      <p className="font-regular text-[#4A5565] text-[20px] pb-4">
        Share your thoughts with other customers
      </p>

      <button className='font-sf-pro-text text-[20px] font-medium bg-[#1B1B1B] rounded-full text-white py-4 px-13'>
        Write a customer review
      </button>
    </div>
  );
}
