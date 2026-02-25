import Image from "next/image";

const cards = [
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
    desc: "Premium ingredients sourced responsibly and tested for purity and effectiveness.",
    bg: "bg-amber-700",
  },
];

export default function Usp() {
  return (
    <section className="relative overflow-hidden rounded-t-3xl bg-neutral-900 py-64 rounded-t-[42px]">
      
      {/* Background Pattern */}
      <Image
        src="/usp-backspiral.svg"
        alt="pattern"
        fill
        className="object-cover"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
        
        {/* Header */}
        <div className="mb-20 space-y-4">
          <h2 className="text-4xl font-bold text-neutral-100">
            Why Choose Us
          </h2>
          <p className="text-lg text-neutral-400">
            We Help You Prioritize Your Health
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-10 md:grid-cols-3 ">
          {cards.map((card) => (
            <div
              key={card.id}
              className={`${card.bg} flex  flex-col items-center justify-center rounded-2xl p-8 text-white shadow-lg transition-transform duration-300 hover:-translate-y-2 py-24`}
            >
              <h3 className="mb-6 text-2xl font-semibold">
                {card.title}
              </h3>

              <p className="mb-8 text-center text-sm leading-relaxed text-white/80">
                {card.desc}
              </p>

              <button className="rounded-full border border-white/40 px-6 py-2 text-sm transition hover:bg-white hover:text-black">
                Learn More
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}