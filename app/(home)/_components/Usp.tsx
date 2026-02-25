import Image from "next/image";

const cards = [
  {
    id: "clear-science",
    title: "Clear Science",
    desc: "Our supplements are crafted with care, backed by science and design for your wellness.",
    bg: "bg-[#0E3A5B]",
  },
  {
    id: "transparency-1",
    title: "Transparency",
    desc: "We clearly share what goes into every product and why it's there, so you always know what you're choosing.",
    bg: "bg-[#5E6B4E]",
  },
  {
    id: "transparency-2",
    title: "Transparency",
    desc: "We clearly share what goes into every product and why it's there, so you always know what you're choosing.",
    bg: "bg-[#B48A67]",
  },
];

export default function Usp() {
  return (
    <section className="ull h-frounded-t-3xl relative overflow-hidden bg-[#1b1b1b] py-32">
      {/* Background Pattern */}

      <Image
        src="/usp-backspiral.svg"
        alt="pattern"
        fill
        className="z-0 object-cover"
      />

      <div className="relative z-10 mx-auto h-screen max-w-7xl px-6 text-center">
        {/* Header */}
        <div className="mb-24 space-y-4">
          <h2 className="text-4xl font-bold text-[#F5EDE3]">Why Choose Us</h2>
          <p className="text-lg text-[#F5EDE3]/60">
            We Help You Prioritize Your Health
          </p>
        </div>

        {/* Cards */}
        <div className="grid w-full gap-10 md:grid-cols-3">
          {cards.map((card) => (
            <div
              key={card.id}
              className={`${card.bg} flex flex-col items-center justify-center rounded-[var(--radius-card)] text-white transition-transform duration-300`}
              /* Using YOUR theme tokens */
              style={{
                width: "var(--width-card)",
                height: "var(--height-card)",
              }}
            >
              <h3
                className="mb-6 font-semibold"
                style={{
                  fontSize: "var(--font-size-card-title)",
                }}
              >
                {card.title}
              </h3>

              <p
                className="mb-8 px-8 text-center leading-relaxed"
                style={{
                  fontSize: "var(--font-size-card-desc)",
                }}
              >
                {card.desc}
              </p>

              <button className="rounded-full border border-white/50 px-6 py-2">
                Learn More
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
