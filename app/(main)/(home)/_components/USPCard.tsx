export type USPCardProps = {
  title: string;
  description: string;
  bgColour: string;
};

export default function USPCard({
  title,
  description,
  bgColour,
}: USPCardProps) {
  return (
    <div
      className="flex size-100 flex-col items-center gap-8 rounded-[3.5rem] px-12 py-16"
      style={{ backgroundColor: bgColour }}
    >
      <span className="font-comfortaa text-3xl font-semibold">{title}</span>
      <p className="text-center text-lg font-light">{description}</p>
      <button
        type="button"
        className="mt-auto cursor-pointer rounded-full border px-12 py-4 transition-all hover:border-[#1B1B1B] hover:bg-[#1B1B1B] active:opacity-75"
      >
        <span className="text-xl font-light">Learn More</span>
      </button>
    </div>
  );
}
