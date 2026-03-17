import Image from "next/image";
import UspContentSection from "./UspContentSection";
import BackGraphics from "../../../assets/usp-backspiral.svg";

type card = {
  id: string;
  title: string;
  desc: string;
  bg: string;
};

export default function USPSection() {
  const cards: card[] = [
    {
      id: "clear-science",
      title: "Clear Science",
      desc: "Our supplements are crafted with care, backed by science and design for your wellness.",
      bg: "bg-usp-card-1",
    },
    {
      id: "transparency-1",
      title: "Transparency",
      desc: "We clearly share what goes into every product and why its there, so you always know what you are choosing.",
      bg: "bg-usp-card-2",
    },
    {
      id: "transparency-2",
      title: "Transparency",
      desc: "We clearly share what goes into every product and why its there, so you always know what you are choosing.",
      bg: "bg-usp-card-3",
    },
  ];

  return (
    <div className="relative h-fit md:min-h-screen overflow-hidden rounded-t-[42px] bg-neutral-900 py-44.5">
      <Image
        src={BackGraphics}
        alt="pattern"
        fill
        className="z-0 object-cover"
      />

      <UspContentSection cards={cards} />
    </div>
  );
}
