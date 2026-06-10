import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import WellnessJourneyBg from "@/assets/wellnessjourney.jpg";

export default function CTASection() {
  return (
    <section className="bg-primary-background px-[calc(100dvw/24)] xl:h-[1024px] flex items-center justify-center py-12 xl:py-0">
      <div className="relative w-full max-w-[1276px] h-[439px] overflow-hidden rounded-[60px] border border-white/10">
        <Image
          src={WellnessJourneyBg}
          alt="Wellness background"
          fill
          sizes="100vw"
          className="object-cover opacity-50"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/10" />
        <div className="relative z-10 flex h-full flex-col justify-center p-10 md:p-16">
          <h2 className="font-comfortaa mb-2 max-w-xs text-2xl font-bold text-white">
            Start Your Wellness Journey Today
          </h2>
          <p className="mb-6 text-sm text-white/75">
            Begin with simple, science-backed support for your daily wellness.
            At your pace.
          </p>
          <Link
            href="/products"
            className="flex w-fit items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-primary-background transition-all hover:scale-[1.02] active:opacity-75"
          >
            Shop Products
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
