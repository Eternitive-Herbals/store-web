"use client";

import { ArrowRight, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";

export type FeaturedProductCardProps = {
  name: string;
  image: string;
  description: string;
  price: number;
  reverse?: boolean;
  href: string;
};

export default function FeaturedProductCard({
  name,
  image,
  description,
  price,
  href
}: FeaturedProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -8 }}
      className="flex h-96 sm:min-h-96 w-full max-w-4xl items-center overflow-hidden text-left relative  rounded-[2.5rem]  border border-stone-300/35 shadow-md hover:shadow-2xl transition-shadow duration-500"
    >
      {/* Image Container with Hover Scale */}
      <div className="relative min-h-full min-w-md w-full md:w-fit overflow-hidden">
        <motion.div
          className="absolute inset-0 h-full w-full"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image
            src={image}
            alt="Featured Product Image"
            fill
            sizes="(max-width: 768px) 100vw, 500px"
            className="object-cover"
          />
        </motion.div>
      </div>

      {/* Content details */}
      <div className="flex flex-1 absolute md:static mt-auto bottom-0 flex-col w-full h-fit md:h-full sm:gap-8 p-4 gap-2 sm:p-8 justify-start md:justify-between bg-[#E2DED3]">
        <div className="flex justify-between items-start w-full">
          <div className="flex flex-col">
            <span className="mdtext-[1.5rem] text-[1rem] font-bold font-comfortaa text-stone-850">{name}</span>
            <p className="text-foreground/75 text-[.75rem] sm:text-[.875rem] mt-0 md:mt-2 leading-relaxed font-light wrap-nowrap w-full">{description}</p>
          </div>
         
        </div>

        <div className="flex items-center justify-between mt-auto">
          <span className="md:text-2xl text-lg sm:text-xl lg:text-3xl font-semibold text-stone-850">₹{price}</span>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
          >
            <Link
              href={href || "#"}
              className="flex items-center gap-2 rounded-full bg-[#1B1B1B] sm:px-6  px-3 py-1.5 sm:py-3 text-white transition-all shadow-md hover:bg-stone-900"
            >
              <span className="text-sm sm:text-lg block sm:hidden lg:block">View Product</span>
              <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}