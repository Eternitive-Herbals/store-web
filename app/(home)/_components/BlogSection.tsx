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
    <div className="h-dvh w-full snap-start bg-[#F9F8F6] py-16 sm:py-24 md:py-32 lg:py-42">
      {/* Header */}
      <div className="flex justify-center px-4">
        <div className="mb-2 flex flex-col items-center gap-3 text-center">
          <span className="font-comfortaa text-2xl text-[#020E35] sm:text-3xl md:text-4xl">
            A Thoughtful Approach to Wellness
          </span>
          <span className="font-sf-pro-text text-base text-[#1B1B1B] sm:text-lg md:text-xl">
            Explore expert insights & self-care guides to
            <br className="hidden sm:block" />
            support your well-being.
          </span>
        </div>
      </div>

      {/* Cards */}
      <div className="mt-12 flex flex-col items-center gap-8 px-4 sm:mt-16 sm:flex-row sm:flex-wrap sm:justify-center md:mt-20 lg:mt-33 lg:flex-nowrap lg:gap-15">
        {cards.map((card) => (
          <div
            key={card.id}
            className="flex h-auto min-h-80 w-full max-w-sm flex-col items-center justify-between rounded-[40px] bg-[#E2DED3] p-6 text-black shadow-lg transition-transform duration-300 hover:-translate-y-2 sm:w-72 sm:p-8 lg:h-101 lg:w-96 lg:rounded-[60px]"
          >
            <div className="flex flex-col items-center gap-6 sm:gap-8 lg:gap-10">
              <h3 className="font-comfortaa mt-6 text-center text-2xl font-semibold sm:mt-10 sm:text-2xl lg:mt-15 lg:text-3xl">
                {card.title}
              </h3>
              <p className="font-sf-pro-text text-center text-base leading-relaxed text-[#1B1B1B] sm:text-base lg:text-lg">
                {card.desc}
              </p>
            </div>

            <button className="mt-6 h-11 w-40 rounded-full border border-white/40 bg-[#1B1B1B] px-6 py-2 text-sm text-white transition hover:bg-white hover:text-black sm:w-44 lg:h-13.5 lg:w-48.5">
              Learn More
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
