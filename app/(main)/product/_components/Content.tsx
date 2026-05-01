"use client";
import Dropdown from "@/components/Dropdown";
import { Check, IndianRupee, StarIcon } from "lucide-react";
import { useState } from "react";

import { useCart } from "@/hooks/useCart";
import { toast } from "sonner";

export default function Content({ product }: { product: any }) {
  const star = [1, 2, 3, 4, 5];
  const [sub, setSub] = useState(true);
  const { addToCart } = useCart();

  const handleAddToCart = async () => {
    const res = await addToCart({
      productId: product._id,
      title: product.name,
      price: product.price,
      description: product.description,
      image: product.image,
      quantity: 1,
    });

    if (res.success) {
      toast.success("Item added to cart");
    }
  };

  if (!product) return null;

  return (
    <div>
      <div className="font-sf-pro-text flex flex-col items-start gap-6">
        <div className="Title-subtitile font-sf-pro-text space-y-1 text-left">
          <h1 className="text-4xl font-normal">{product.name}</h1>
          <p className="text-xl font-light">
            {product.description}
          </p>
        </div>
        <div className="">
          <div className="flex items-center gap-1 py-2">
            {star.map((idx) => (
              <StarIcon
                key={idx}
                size={19}
                className="fill-[#FFCC32] text-[#FFCC32]"
              />
            ))}
          </div>
          <p className="flex place-items-baseline gap-2 text-4xl font-semibold">
            ₹{product.price} <span className="font-light text-[#9EA1A7]"> | </span>{" "}
            <span className="text-2xl text-[#009966]">20% off</span>
          </p>

          <p className="text-primary-background mt-9 w-full max-w-9/10 text-xl font-light text-wrap">
            {product.description}
          </p>
        </div>

        <div className="flex w-full flex-col items-start gap-1">
          <label className="relative w-9/10 cursor-pointer rounded-lg border border-[#AE8363]/50">
            <div className="inset-0 top-0 rounded-t-lg bg-[#AE8363]/50 p-2 text-center text-xl font-medium text-black">
              Save 20% on every delivery
            </div>
            <div className="">
              <div className="flex items-start justify-between p-4">
                <div className="font-sf-pro-text text-xl font-medium">
                  <div className="mb-2 flex items-center">
                    <input
                      type="radio"
                      checked={sub}
                      onChange={() => setSub(true)}
                      className="peer border-primary-background mr-2 size-8 appearance-none rounded-full border focus:border-transparent focus:ring-2 focus:outline-none"
                    />
                    Subscribe & Save
                  </div>
                  <div className="ml-10 flex w-fit items-center justify-center rounded-lg bg-[#07A763]/20 p-1 px-2 text-xl text-black">
                    20% off per serving
                  </div>
                </div>
                <span>₹{Math.round(product.price * 0.8)}</span>
              </div>
              <div className="items-strt font-sf-pro-text flex justify-between gap-4 p-4">
                <div className="space-y-1">
                  <h1 className="font-regular mb-4 text-xl">
                    How Subscription Works
                  </h1>
                  <p className="flex items-center gap-2 text-[16px] font-light">
                    <span className="bg-primary-background flex size-6 items-center justify-center rounded-full p-1">
                      <Check color="white" className="size-6" />
                    </span>
                    1 Bottle delivered every month{" "}
                  </p>
                  <p className="flex items-center gap-2 text-[16px] font-light">
                    <span className="bg-primary-background flex size-6 items-center justify-center rounded-full p-1">
                      <Check color="white" className="size-6" />
                    </span>
                    Pause, Modify or cancel anytime{" "}
                  </p>
                </div>
                <div className="space-y-2">
                  <h1 className="text-xl font-extralight">Deliver every{""}</h1>
                  <Dropdown
                    options={["1 week", "2 weeks", "3 weeks", "4 weeks"]}
                  />
                </div>
              </div>
            </div>
          </label>
          <label className="flex w-9/10 cursor-pointer justify-between rounded-lg border border-[#AE8363]/50 p-3">
            <div>
              <input
                type="radio"
                checked={!sub}
                onChange={() => setSub(false)}
                className="mr-2"
              />
              One time
            </div>
            <span>₹{product.price}</span>
          </label>
        </div>

        <div className="btns mt-11 w-9/10 space-y-4">
          <button className="bg-primary-background w-full rounded-full py-2 text-white transition-all hover:opacity-90 active:scale-95">
            Buy Now
          </button>
          <button 
            onClick={handleAddToCart}
            className="w-full rounded-full bg-gray-200 py-2 transition-all hover:bg-gray-300 active:scale-95"
          >
            Add to Cart
          </button>
        </div>
        <div className="flex w-9/10 flex-col items-start gap-6 border-t border-[#E5E7EB] pt-6">
          <h1 className="text-sm font-medium text-[#6A7282]">DOSAGE</h1>
          <p className="font-regular text-base text-[#364153]">
            {product.dosage || "Take 2 capsules 30-60 minutes before bedtime with water. For best results, use consistently as part of your nightly routine."}
          </p>
        </div>
      </div>
    </div>
  );
}