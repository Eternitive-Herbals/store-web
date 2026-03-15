type card = {
  id: string;
  title: string;
  desc: string;
};

export default function BlogSection() {
  const cards: card[] = [
    {
      id: "Eat Better, Feel Better",
      title: "Eat Better, Feel Better",
      desc: "Simple tips on what & when to eat, & how to build balanced meals that fit into your lifestyle.",
    },
    {
      id: "Meditation & Relaxation",
      title: "Meditation & Relaxation",
      desc: "Learn how to slow down, reset, & recharge with practical relaxation habits that fit into real life.",
    },
    {
      id: "Move Your Body",
      title: "Move Your Body",
      desc: "Workout ideas, recovery tips, and easy ways to stay active at home.",
    },
  ];
  return (
    <div className="w-full bg-[#F9F8F6] py-42">
      <div className="flex justify-center">
        <div className="mb-2 flex flex-col items-center gap-3 text-center">
          <span className="font-comfortaa text-4xl text-[#020E35]">
            A Thoughtful Approach to Wellness
          </span>

          <span className="font-sf-pro-text text-xl text-[#1B1B1B]">
            Explore expert insights & self-care guides to
            <br />
            support your well-being.
          </span>
        </div>
      </div>
      <div className="flex justify-center gap-15">
        {cards.map((card) => (
          <div
            key={card.id}
            className="mt-33 flex h-101 w-96 flex-col items-center justify-between rounded-[60px] bg-[#E2DED3] p-8 text-black shadow-lg transition-transform duration-300 hover:-translate-y-2"
          >
            <div className="flex flex-col items-center gap-10">
              <h3 className="font-comfortaa mt-15 h-16.5 w-61.75 text-center text-3xl font-semibold">
                {card.title}
              </h3>

              <p className="font-sf-pro-text mb-8 h-19.75 w-76.75 text-center text-lg leading-relaxed text-[#1B1B1B]">
                {card.desc}
              </p>
            </div>

            <button className="h-13.5 w-48.5 cursor-pointer rounded-full border border-white/40 bg-[#1B1B1B] px-6 py-2 text-sm text-white transition hover:bg-white hover:text-black">
              Learn More
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
