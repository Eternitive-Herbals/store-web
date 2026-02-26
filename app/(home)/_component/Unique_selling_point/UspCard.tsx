import React from "react";
type card = {
  id: string;
  title: string;
  desc: string;
  bg: string;
};

const UspCard = ({ cards }: { cards: card[] }) => {
  return (
    <div className="grid gap-10 md:grid-cols-3">
      {cards.map((card) => (
        <div
          key={card.id}
          className={`${card.bg} flex flex-col items-center justify-center rounded-2xl p-8 py-24 text-white shadow-lg transition-transform duration-300 hover:-translate-y-2`}
        >
          <h3 className="mb-6 text-2xl font-semibold">{card.title}</h3>

          <p className="mb-8 text-center text-sm leading-relaxed text-white/80">
            {card.desc}
          </p>

          <button className="rounded-full border border-white/40 px-6 py-2 text-sm transition hover:bg-white hover:text-black">
            Learn More
          </button>
        </div>
      ))}
    </div>
  );
};

export default UspCard;
