import Image from "next/image";
import Logo from "@/assets/Aethery_black.svg";

export default function DiscoverSection() {
  return (
    <section className="bg-background px-[calc(100dvw/24)] py-24">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 md:grid-cols-2">
        {/* Logo Card */}
        <div className="flex min-h-[240px] items-center justify-center rounded-3xl bg-[#F3F4F0] p-16">
          <div className="flex items-center gap-3">
            <Image
              src={Logo}
              alt="Aethery logo"
              className="size-12 object-contain"
            />
            <span className="font-comfortaa text-3xl font-bold tracking-tight text-primary-background">
              aethery
            </span>
          </div>
        </div>

        {/* Text Content */}
        <div className="flex flex-col gap-4">
          <h2 className="font-comfortaa text-2xl font-bold text-primary-background">
            Discover Eternitive
          </h2>
          <p className="text-sm leading-relaxed text-stone-600">
            Eternitive Herbals is an international organization based in New
            Delhi India, involved in Manufacturing and Export of Herbal Food
            supplements &amp; Ayurveda medicines.
          </p>
          <p className="text-sm leading-relaxed text-stone-600">
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
