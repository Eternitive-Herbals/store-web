import { ArrowRight } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

export type FeaturedProductCardProps = {
  title: string;
  image: StaticImageData;
  description: string;
  price: number;
};

export default function FeaturedProductCard({
  title,
  image,
  description,
  price,
}: FeaturedProductCardProps) {
  return (
    <div className="flex h-96 w-full max-w-5xl items-center overflow-hidden rounded-4xl bg-[#E2DED3]">
      <div className="relative min-h-full min-w-md">
        <Image
          src={image}
          alt="Featured Product Image"
          fill
          className="object-cover"
        />
      </div>
      <div className="flex h-full flex-1 flex-col px-8 pt-16 pb-8">
        <span className="text-[2rem]">{title}</span>
        <p className="text-foreground/75 w-3/4 text-xl">{description}</p>
        <span className="mt-4 text-3xl">₹ {price}</span>
        <Link
          href={"/product/alskdjfhlkajsdhflkajsdf"}
          className="mt-auto flex items-center gap-2 self-end rounded-full bg-[#1B1B1B] px-6 py-2 text-white transition-all hover:opacity-75 active:opacity-50"
        >
          <span className="text-2xl">View Product</span>
          <ArrowRight size={24} />
        </Link>
      </div>
    </div>
  );
}
