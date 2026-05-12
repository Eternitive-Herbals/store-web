import Image from "next/image";
import ProductBgImage from "@/assets/products-sample-image-1.png";

export default function HeroSection() {
  return (
    <div className="relative flex justify-end px-24 pt-42 pb-24">
      <Image
        src={ProductBgImage}
        alt="product-image"
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover object-right"
      />
      <div className="absolute inset-0 -z-10 bg-linear-to-br from-transparent to-black/90" />
      <span className="text-background font-comfortaa z-10 w-full max-w-4xl text-right text-7xl leading-tight">
        Nourish you body, Elevate your life
      </span>
    </div>
  );
}
