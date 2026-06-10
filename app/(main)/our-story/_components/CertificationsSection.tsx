const certs = [
  { label: "WHO GMP", color: "#3B6EA5" },
  { label: "HACCP", color: "#C8960C" },
  { label: "ISO\n9001:2015", color: "#1A6BB5" },
  { label: "100%\nSatisfaction", color: "#C0392B" },
  { label: "GMP", color: "#27AE60" },
];

export default function CertificationsSection() {
  return (
    <section className="mx-[calc(100dvw/24)] mb-12 flex flex-col items-center gap-8 rounded-3xl bg-primary-background px-12 py-10">
      <h2 className="font-comfortaa text-xl font-bold text-white">
        Our Certification
      </h2>
      <div className="flex flex-wrap items-center justify-center gap-7">
        {certs.map((cert) => (
          <div
            key={cert.label}
            className="flex size-20 flex-col items-center justify-center rounded-full bg-white/5 text-center"
            style={{ border: `3px solid ${cert.color}` }}
          >
            <span
              className="whitespace-pre-line text-[10px] font-bold leading-tight"
              style={{ color: cert.color }}
            >
              {cert.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
