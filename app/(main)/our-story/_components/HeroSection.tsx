import Image from "next/image";
import BackgroundTexture from "@/assets/background-texture-brown-1.svg";

export default function HeroSection() {
  return (
    <section className="relative flex h-[320px] items-center justify-center overflow-hidden bg-primary-background">
      <Image
        src={BackgroundTexture}
        alt="Background Texture"
        fill
        sizes="100vw"
        className="object-cover opacity-20"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/30" />
      <h1 className="font-comfortaa relative z-10 text-5xl font-bold tracking-tight text-white">
        Our Story
      </h1>
    </section>
  );
}
