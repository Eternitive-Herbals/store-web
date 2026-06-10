import Image from "next/image";
import BackgroundTexture from "@/assets/background-texture-brown-1.svg";

export default function AtAGlanceSection() {
  return (
    <section className="relative mx-[calc(100dvw/24)] overflow-hidden rounded-3xl bg-gradient-to-br from-[#2D5016] via-[#3A6B1A] to-[#2D5016] px-12 py-16 text-center">
      <Image
        src={BackgroundTexture}
        alt="Leaf Texture"
        fill
        sizes="100vw"
        className="object-cover opacity-10"
      />
      <div className="relative z-10 mx-auto max-w-3xl">
        <h2 className="font-comfortaa mb-8 text-2xl font-bold text-white">
          At A Glance
        </h2>
        <p className="mb-5 text-sm leading-relaxed text-white/90">
          Eternitive Herbals products are formally registered by Ministry of
          Health and competent authorities on Herbal Food Supplements in The
          Republic of Azerbaijan. We have our expertise in designing product
          formulations according to the Laws and quality control regulations of
          respective countries.
        </p>
        <p className="mb-5 text-sm leading-relaxed text-white/90">
          Mission of Eternitive Herbals is to Help healthy people to maintain
          and promote their health i.e. &quot;Swasthasya swasthya rakshanam&quot;
          and to manage imbalances and disorders of peoples following the
          principles of Ayurveda i.e. &quot;Aturasya vikar prashamanam
          cha&quot;.
        </p>
        <p className="text-sm leading-relaxed text-white/90">
          The herbal formulas of Eternitive Herbals, represent the authentic
          wisdom from the ancient Ayurvedic texts, complemented by modern
          scientific research and leading edge technologies in manufacturing and
          quality control. You can be confident that getting very best in herbal
          formulations.
        </p>
      </div>
    </section>
  );
}
