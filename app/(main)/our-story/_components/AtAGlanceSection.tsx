import Image from "next/image";
import LeafBg from "@/assets/leaf.png";

export default function AtAGlanceSection() {
  return (
    <section className="relative mx-[calc(100dvw/24)] xl:mx-auto max-w-[1280px] h-[720px] flex flex-col justify-center items-center overflow-hidden rounded-[32px] bg-[#07A763] px-6 md:px-12 text-center">
      <Image loading="lazy"
        src={LeafBg}
        alt="Leaf Background"
        width={2694}
        height={2237}
        className="absolute object-cover opacity-[0.21] w-full h-full inset-0 xl:w-[2694px] xl:h-[2237px] xl:top-[-972px] xl:left-[-1085px] xl:max-w-none"
      />
      <div className="relative z-10 mx-auto w-full max-w-[1021px] xl:absolute xl:top-[100px] xl:left-[129px] xl:w-[1021px] xl:h-[540px] flex flex-col justify-start">
        <h2 className="font-comfortaa mb-8 text-[28px] md:text-[36px] leading-[34px] font-bold text-white mx-auto xl:w-[240.3px] xl:h-[34px]">
          At A Glance
        </h2>
        <p className="mb-5 font-sf-pro-text text-[16px] md:text-[24px] leading-relaxed md:leading-[34px] font-normal text-white/90">
          Eternitive Herbals products are formally registered by Ministry of
          Health and competent authorities on Herbal Food Supplements in The
          Republic of Azerbaijan. We have our expertise in designing product
          formulations according to the Laws and quality control regulations of
          respective countries.
        </p>
        <p className="mb-5 font-sf-pro-text text-[16px] md:text-[24px] leading-relaxed md:leading-[34px] font-normal text-white/90">
          Mission of Eternitive Herbals is to Help healthy people to maintain
          and promote their health i.e. &quot;Swasthasya swasthya rakshanam&quot;
          and to manage imbalances and disorders of peoples following the
          principles of Ayurveda i.e. &quot;Aturasya vikar prashamanam
          cha&quot;.
        </p>
        <p className="font-sf-pro-text text-[16px] md:text-[24px] leading-relaxed md:leading-[34px] font-normal text-white/90">
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
