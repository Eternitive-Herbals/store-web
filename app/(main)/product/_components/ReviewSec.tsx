import { StarIcon } from "lucide-react";
import reviewImage from "@/assets/product/reviewImage.png";
import Image from "next/image";

export default function ReviewSec() {
  const Reviews = [
    {
      content:
        "Sufficient particular impossible by reasonable oh expression is. Yet preference connection unpleasant yet melancholy but end appearance. And excellence.",
      href: reviewImage,
    },
    {
      content:
        "Sufficient particular impossible by reasonable oh expression is. Yet preference connection unpleasant yet melancholy but end appearance. And excellence.",
    
    },
    {
      content:
        "Sufficient particular impossible by reasonable oh expression is. Yet preference connection unpleasant yet melancholy but end appearance. And excellence.",
     
    },

    {
      content:
        "Sufficient particular impossible by reasonable oh expression is. Yet preference connection unpleasant yet melancholy but end appearance. And excellence.",
       href: reviewImage,
    },
    {
      content:
        "Sufficient particular impossible by reasonable oh expression is. Yet preference connection unpleasant yet melancholy but end appearance. And excellence.",
      
    },

    {
      content:
        "Sufficient particular impossible by reasonable oh expression is. Yet preference connection unpleasant yet melancholy but end appearance. And excellence.",
      href: reviewImage,
    },

    {
      content:
        "Sufficient particular impossible by reasonable oh expression is. Yet preference connection unpleasant yet melancholy but end appearance. And excellence.",
      
    },
  ];
  return (
    <div className="w-full p-9 mt-14">
      <div className="mx-auto flex h-fit max-h-284 w-[967px] flex-col overflow-hidden flex-wrap items-center gap-5 ">
        {Reviews.map((review, i) => (
          <div key={i} className="flex h-fit w-[473px]">
            <div className="w-full rounded-2xl bg-white px-6 py-11">
              <div className="flex w-full items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="size-11 rounded-full bg-gray-600" />
                  <div className="font-sf-pro-text">
                    <h2 className="text-[18px] font-bold">Sidharth</h2>
                    <h3 className="text-xs font-medium">Delhi, India</h3>
                  </div>
                </div>
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarIcon
                      key={i}
                      size={19}
                      className="fill-[#FFCC32] text-[#FFCC32]"
                    />
                  ))}
                </div>
              </div>
              <div className="content font-sf-pro-text font-regular relative py-3 text-[15px] tracking-wide">
                <p>
                  {review.content}
                </p>
{review.href && (
                <Image
                  src={review.href}
                  alt="reviewImage"
                  className="object-cover"
                />)}
              </div>
            </div>
          </div>
        ))}
      </div>

      
    </div>
  );
}
