import { Copyright } from "lucide-react";
import Image from "next/image";
import XLogo from "@/assets/x-logo.svg";
import InstagramLogo from "@/assets/instagram-logo.svg";
import FooterFirstImage from "@/assets/spiral_footer.svg";
import FooterElementalIcons from "../assets/footer-elemental-icons.svg";
import FooterAetheryText from "@/assets/footer-aethery-text.svg";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="font-comfortaa relative flex h-dvh flex-col justify-between bg-[#1B1B1B] px-[calc(100dvw/24)] pt-48 text-white">
      <Image
        src={FooterFirstImage}
        alt="footer spiral"
        fill
        className="object-cover"
      />

      <Image
        src={FooterElementalIcons}
        alt="Elemental Icons"
        className="absolute top-0 left-1/2 z-10 -translate-1/2"
      />

      <div className="z-10 mx-auto flex w-full max-w-7xl items-start justify-between gap-8 text-sm font-extralight">
        <div className="flex flex-col gap-4">
          <Link href={"mailto:contact@aethery.com"}>contact@aethery.com</Link>
          <Link href={"tel:+919810373111"}>+91 9810373111</Link>
        </div>

        <div className="mx-auto flex flex-col gap-4">
          <Link
            href={"/privacy-policy"}
            className="transition-all hover:opacity-75 active:opacity-50"
          >
            <span>Privacy Policy</span>
          </Link>
          <Link
            href={"/terms-and-conditions"}
            className="transition-all hover:opacity-75 active:opacity-50"
          >
            <span>Terms & Conditions</span>
          </Link>
          <Link
            href={"/refund-policy"}
            className="transition-all hover:opacity-75 active:opacity-50"
          >
            <span>Refund & Return Policy</span>
          </Link>
          <Link
            href={"/support"}
            className="transition-all hover:opacity-75 active:opacity-50"
          >
            <span>Help Center</span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href={"https://x.com"}
            target="_blank"
            className="transition-all hover:opacity-75 active:opacity-50"
          >
            <Image src={XLogo} alt="X Logo" className="size-6" />
          </Link>
          <Link
            href={"https://instagram.com"}
            target="_blank"
            className="transition-all hover:opacity-75 active:opacity-50"
          >
            <Image src={InstagramLogo} alt="X Logo" className="size-6" />
          </Link>
        </div>
      </div>

      <h1 className="z-10 mx-auto flex items-center gap-2 text-lg">
        <Copyright size={16} />
        aethery. 2018 All rights reserved.
      </h1>

      <Image
        alt="footer_aethery"
        src={FooterAetheryText}
        className="z-10 mx-auto w-fit"
      />
    </div>
  );
}
