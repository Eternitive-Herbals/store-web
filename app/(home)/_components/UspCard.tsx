import React from "react";
type card = {
  id: string;
  title: string;
  desc: string;
  bg: string;
};

const UspCard = ({ cards }: { cards: card[] }) => {
  return (
    <div className="flex gap-15">
      {cards.map((card) => (
        <div
          key={card.id}
          className={`${card.bg} flex h-101 w-96 flex-col items-center justify-between rounded-[60px] p-8 py-18 text-white shadow-lg transition-transform duration-300 hover:-translate-y-2`}
        >
          <div className="flex flex-col items-center gap-10">
            <h3 className="mb-6 text-2xl font-semibold">{card.title}</h3>

            <p className="mb-8 text-center text-sm leading-relaxed text-white/80">
              {card.desc}
            </p>
          </div>

          <button className="w-fit cursor-pointer rounded-full border border-white/40 px-6 py-2 text-sm transition hover:bg-white hover:text-black">
            Learn More
          </button>
        </div>
      ))}
    </div>
  );
};

export default UspCard;
