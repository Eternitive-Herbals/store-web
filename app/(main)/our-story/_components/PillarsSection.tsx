const pillars = [
  {
    title: "Knowledge",
    text: "Eternitive Herbals is also extensively involved in promoting the knowledge of Ayurveda by organizing Seminars, Providing Online Certificate Courses in different specialties of Ayurveda like Marma Chikitsa, Nadi vigyan, Panchkarma, Yoga & Pranayam etc. We also Provide Online Health and Wellness consultations all over the World.",
  },
  {
    title: "Our Mission",
    text: "To develop a team of dedicated persons including Vaidyas (Ayurveda Doctors), Health professionals, distributors etc. who are willing to fulfill our vision and ready to spread this beautiful knowledge of Ayurveda all over the world and also to create awareness among peoples here & abroad regarding benefits of Ayurveda.",
  },
  {
    title: "Our Vision",
    text: '"Applying the Ancient knowledge of Ayurveda in modern context & conveying its potent healing potential to improve the quality of Health & life of an individual and the society in general."',
  },
];
export default function PillarsSection() {
  return (
    <section className="bg-background px-[calc(100dvw/24)] py-24">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-3">
        {pillars.map((pillar) => (
          <div
            key={pillar.title}
            className="rounded-2xl border border-stone-100 bg-white p-8 shadow-sm transition-shadow hover:shadow-md"
          >
            <h3 className="font-comfortaa mb-4 text-center text-lg font-bold text-primary-background">
              {pillar.title}
            </h3>
            <p className="text-center text-sm leading-relaxed text-stone-500">
              {pillar.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
