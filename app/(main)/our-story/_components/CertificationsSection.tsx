<<<<<<< Updated upstream
import GMP from "@/assets/gmp.svg";
import WHO from "@/assets/WHO.svg";
import SAT from "@/assets/satisfaction.svg";
import ISO from "@/assets/ISO.svg";
import HACCP from "@/assets/haccp.svg";
import Image from "next/image";
const certs = [WHO, HACCP, ISO, SAT, GMP];
export default function CertificationsSection() {
  return (
    <section className="bg-primary-background mx-[calc(100dvw/24)] mb-12 flex flex-col items-center gap-8 rounded-3xl px-12 py-10">
      <h2 className="font-comfortaa text-xl font-bold text-white">
        Our Certification
      </h2>
      <div className="flex flex-wrap items-center justify-center gap-7">
        {certs.map((cert, idx) => (
          <Image loading="lazy"
            alt={`${cert} certificate`}
            src={cert}
            key={idx}
            // size={100}
            className="h-[72px] w-[72px] md:h-fit md:w-fit object-contain"
            
          />
        ))}
      </div>
    </section>
  );
}
=======

import GMP from "@/assets/gmp.svg"
import WHO from "@/assets/WHO.svg"
import SAT from "@/assets/satisfaction.svg"
import ISO from "@/assets/ISO.svg"
import HACCP from "@/assets/haccp.svg"
import Image from "next/image"

const certs = [
  WHO,HACCP,ISO,SAT,GMP
];

export default function CertificationsSection() {
  return (
    <section className="mx-[calc(100dvw/24)] mb-12 flex flex-col items-center gap-8 rounded-3xl bg-primary-background px-12 py-10">
      <h2 className="font-comfortaa text-xl font-bold text-white">
        Our Certification
      </h2>
      <div className="flex flex-wrap items-center justify-center gap-7">
        {certs.map((cert, idx) => (
          <Image
          alt={`${cert} certificate`}
          src={cert}
          key={idx} 
          size={100}
          priority
          />
          
        ))}
      </div>
    </section>
  );
}
>>>>>>> Stashed changes
