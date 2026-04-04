import Image from "next/image";
import BackgroundTexture from "@/assets/background-texture-white-2.svg";
import USPCard, { USPCardProps } from "./USPCard";

export default function USPSection() {
  const cards: USPCardProps[] = [
    {
      title: "Clear Science",
      description:
        "Our supplements are crafted with care, backed by science and design for your wellness.",
      bgColour: "#0A3351",
    },
    {
      title: "Transparency",
      description:
        "We clearly share what goes into every product and why its there, so you always know what you are choosing.",
      bgColour: "#576149",
    },
    {
      title: "Transparency",
      description:
        "We clearly share what goes into every product and why its there, so you always know what you are choosing.",
      bgColour: "#AE8363",
    },
  ];

  return (
    <section className="relative flex min-h-dvh snap-start flex-col items-center justify-between overflow-hidden bg-[#1B1B1B] px-20 py-48 text-white">
      <Image
        src={BackgroundTexture}
        alt="Background Texture"
        fill
        className="object-cover opacity-5"
      />

      <div className="font-comfortaa z-10 flex flex-col gap-2 text-center">
        <span className="text-4xl font-bold">Why Choose Us</span>
        <span className="text-xl opacity-75">
          We Help You Prioritize Your Health
        </span>
      </div>

      <div className="z-10 flex gap-16">
        {cards.map((card, index) => (
          <USPCard key={index} {...card} />
        ))}
      </div>
    </section>
  );
}
