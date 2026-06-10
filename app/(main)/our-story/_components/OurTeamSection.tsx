import { User } from "lucide-react";

const teamMembers = [
  { name: "Team Member", role: "Founder & CEO" },
  { name: "Team Member", role: "Head of Research" },
  { name: "Team Member", role: "Lead Vaidya" },
];

export default function OurTeamSection() {
  return (
    <section className="bg-background px-[calc(100dvw/24)] py-24">
      <h2 className="font-comfortaa mb-12 text-center text-3xl font-bold text-primary-background">
        Our Team
      </h2>
      <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
        {teamMembers.map((member, i) => (
          <div
            key={i}
            className="flex flex-col items-center gap-3"
          >
            {/* Avatar Placeholder */}
            <div className="flex size-28 items-center justify-center rounded-full bg-gradient-to-br from-stone-200 to-stone-300">
              <User size={48} className="text-stone-400" />
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold text-primary-background">
                {member.name}
              </p>
              <p className="text-xs text-stone-500">{member.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
