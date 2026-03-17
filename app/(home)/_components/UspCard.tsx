import React from "react";

type card = {
  id: string;
  title: string;
  desc: string;
  bg: string;
};

const UspCard = ({ cards }: { cards: card[] }) => {
  return (
    <div className="flex flex-col items-center gap-6 sm:gap-10 md:flex-row md:flex-wrap md:justify-center lg:flex-nowrap lg:gap-15">
      {cards.map((card) => (
        <div
          key={card.id}
          className={`${card.bg} flex h-auto min-h-80 w-full max-w-sm flex-col items-center justify-between rounded-[40px] p-6 py-10 text-white shadow-lg transition-transform duration-300 hover:-translate-y-2 md:min-h-96 md:w-72 md:py-14 lg:h-101 lg:w-96 lg:rounded-[60px] lg:py-18`}
        >
          <div className="flex flex-col items-center gap-6 md:gap-8 lg:gap-10">
            <h3 className="mb-2 text-center text-xl font-semibold sm:text-2xl">
              {card.title}
            </h3>
            <p className="mb-4 text-center text-sm leading-relaxed text-white/80">
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
