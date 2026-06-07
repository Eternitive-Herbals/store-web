"use client";

import { ArrowRight, Star } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { motion } from "motion/react";

export type FeaturedProductCardProps = {
  title: string;
  image: StaticImageData;
  description: string;
  price: number;
  reverse?: boolean;
  href: string;
};

export default function FeaturedProductCard({
  title,
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
      className="flex h-96 w-full max-w-6xl items-center overflow-hidden rounded-[2.5rem] bg-[#E2DED3] border border-stone-300/35 shadow-md hover:shadow-2xl transition-shadow duration-500"
    >
      {/* Image Container with Hover Scale */}
      <div className="relative min-h-full min-w-md overflow-hidden">
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
      <div className="flex h-full flex-1 flex-col gap-8 p-8 justify-between">
        <div className="flex justify-between items-start w-full">
          <div className="flex flex-col">
            <span className="text-[2rem] font-bold text-stone-850">{title}</span>
            <p className="text-foreground/75 w-3/4 text-lg mt-2 leading-relaxed font-light">{description}</p>
          </div>
          <div className="flex gap-1 text-[#EDC06F]">
            <Star size={18} className="fill-[#EDC06F] text-[#EDC06F]" />
            <Star size={18} className="fill-[#EDC06F] text-[#EDC06F]" />
            <Star size={18} className="fill-[#EDC06F] text-[#EDC06F]" />
            <Star size={18} className="fill-[#EDC06F] text-[#EDC06F]" />
            <Star size={18} className="fill-[#EDC06F] text-[#EDC06F]" />
          </div>
        </div>

        <div className="flex items-center justify-between mt-auto">
          <span className="text-3xl font-semibold text-stone-850">₹{price}</span>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
          >
            <Link
              href={href || "#"}
              className="flex items-center gap-2 rounded-full bg-[#1B1B1B] px-6 py-3 text-white transition-all shadow-md hover:bg-stone-900"
            >
              <span className="text-xl">View Product</span>
              <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}