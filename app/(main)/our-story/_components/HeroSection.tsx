import Image from "next/image";
import StoryBg from "@/assets/our-story-bg.png";
export default function HeroSection() {
  return (
    <section className="relative flex h-[567px] items-center justify-center overflow-hidden bg-primary-background">
      <Image loading="lazy"
        src={StoryBg}
        alt="Background Texture"
        fill
        sizes="100vw"
        className="object-cover opacity-50"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/30" />
      <h1 className="font-comfortaa relative z-10 text-5xl font-bold tracking-tight text-white">
        Our Story
      </h1>
    </section>
  );
}
