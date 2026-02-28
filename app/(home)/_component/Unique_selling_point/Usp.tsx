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
    desc: "Our supplements are crafted with care, backed by science and designed for your wellness.",
    bg: "bg-slate-800",
  },
  {
    id: "transparency-1",
    title: "Transparency",
    desc: "We clearly share what goes into every product and why it's there, so you always know what you're choosing.",
    bg: "bg-olive-700",
  },
  {
    id: "transparency-2",
    title: "Quality",
    desc: "We clearly share what goes into every product and why it’s there, so you always know what you’re choosing.",
    bg: "bg-amber-700",
  },
];

export default function Usp() {
  return (
    <div className="h-screen-1 relative rounded-t-[42] bg-neutral-900 py-[178px] ">
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
