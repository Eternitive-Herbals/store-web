import Image from "next/image";
import UspContentSection from "./UspContentSection";

type card = {
  id: string;
  title: string;
  desc: string;
  bg: string;
};
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
export default function Usp() {
  return (
    // Usp.tsx - add overflow-hidden
<div className="h-full min-h-screen relative overflow-hidden rounded-t-[42px] bg-neutral-900 py-[178px]">
   {/* Background Pattern */}
      <Image
        src="/assets/usp-backspiral.svg"
        alt="pattern"
        fill
        className="z-0 object-cover"
      />

      <UspContentSection cards={cards} />
    </div>
  );
}
