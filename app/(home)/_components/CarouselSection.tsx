import SampleImage1 from "@/assets/product-sample-image-1.png";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";

export default function CarouselSection() {
  return (
    <div className="bg-foreground relative h-dvh">
      <button
        type="button"
        className="absolute top-1/2 left-16 z-10 -translate-y-1/2 cursor-pointer rounded-full bg-[#E2DED3] p-2 transition-all hover:opacity-75 active:opacity-50"
      >
        <ArrowLeft size={24} className="text-[#4F5C39]" />
      </button>
      <Image
        src={SampleImage1}
        alt="CTA Image"
        fill
        unoptimized
        className="object-cover"
      />
      <div className="absolute top-1/2 left-1/2 flex w-1/4 translate-x-1/2 -translate-y-1/2 flex-col gap-6 text-white transition-all">
        <span className="text-[2.5rem]">Immunohigh</span>
        <p className="text-2xl font-light">
          Supports your body&apos;s natural immune defence to help you stay
          protected every day.
        </p>
      </div>
      <Link
        href={"/product/alskdjfhlkajsdhflkajsdf"}
        className="absolute right-20 bottom-24 flex items-center gap-2 rounded-full bg-[#1B1B1B] px-6 py-2 text-white transition-all hover:opacity-75 active:opacity-50"
      >
        <span className="text-2xl">View Product</span>
        <ArrowRight size={24} />
      </Link>
      <button
        type="button"
        className="absolute top-1/2 right-16 z-10 -translate-y-1/2 cursor-pointer rounded-full bg-[#E2DED3] p-2 transition-all hover:opacity-75 active:opacity-50"
      >
        <ArrowRight size={24} className="text-[#4F5C39]" />
      </button>
    </div>
  );
}
