import UspCard from "./UspCard";

type card = {
  id: string;
  title: string;
  desc: string;
  bg: string;
};

const UspContentSection = ({ cards }: { cards: card[] }) => {
  return (
    <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
      {/* Header */}
      <div className="mb-20 space-y-4">
        <h2 className="text-4xl font-bold text-neutral-100">Why Choose Us</h2>
        <p className="text-lg text-neutral-400">
          We Help You Prioritize Your Health
        </p>
      </div>

      {/* Cards */}
      <UspCard cards={cards} />
    </div>
  );
};

export default UspContentSection;
