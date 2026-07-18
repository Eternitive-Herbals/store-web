import Image from "next/image";
import Logo from "@/assets/Aethery_black.svg";

export default function DiscoverSection() {
  return (
    <section className="bg-background px-[calc(100dvw/24)] py-24">
      <div className="mx-auto grid max-w-[1280px] w-full grid-cols-1 items-center gap-[46px] lg:grid-cols-2 md:h-[424px]">
        {/* Logo Card */}
        <div className="flex w-full md:w-fit h-[300px] md:h-[424px] items-center justify-center rounded-[32px] bg-[#F3F4F0] p-6">
          <div className="flex items-center gap-4 md:gap-[35px] w-fit max-w-full md:w-[564.37px] md:h-[121px]">
            <Image
              src={Logo}
              alt="Aethery logo"
              className="w-[80px] h-[80px] md:w-[121px] md:h-[121px] object-contain"
            />
            <span className="font-comfortaa text-[48px] md:text-[88px] font-bold tracking-tight text-primary-background leading-none md:leading-[121px]">
              aethery
            </span>
          </div>
        </div>

        {/* Text Content */}
        <div className="flex w-full md:w-[617px] h-auto md:h-[399px] flex-col justify-center gap-6">
          <h2 className="font-comfortaa text-2xl md:text-[32px] font-bold text-primary-background leading-tight md:leading-[40px]">
            Discover Eternitive
          </h2>
          <p className="text-sm md:text-base leading-relaxed text-wrap text-stone-600">
            Eternitive Herbals is an international organization based in New
            Delhi India, involved in Manufacturing and Export of Herbal Food
            supplements &amp; Ayurveda medicines.
          </p>
          <p className="text-sm md:text-base leading-relaxed text-stone-600">
            Our Herbal formulations represent the authentic wisdom from the
            Ayurvedic texts, complemented by modern scientific researches and
            leading edge manufacturing and quality control technologies.
            Eternitive Herbals is an Ayurvedic Medicine Online Store, for which
            you can be confident, that you are getting the very best in Herbal
            formulations — A True fusion of the Ancient and Modern.
          </p>
        </div>
      </div>
    </section>
  );
}
