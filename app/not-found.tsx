import Image from "next/image";
import BackgroundTexture from "@/assets/background-texture-brown-1.svg";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative flex min-h-dvh flex-col items-center justify-center">
      <Image
        src={BackgroundTexture}
        alt="background texture"
        fill
        className="-z-10 object-cover opacity-5"
      />
      <span className="text-4xl">404 Not Found</span>
      <p>It seems like you&apos;re a little lost 🤗</p>
      <Link
        href={"/"}
        className="mt-8 flex items-center gap-2 rounded-full bg-[#1B1B1B] px-4 py-2 text-white transition-all hover:opacity-75 active:opacity-50"
      >
        <span className="text-lg">Go To Home</span>
        <ArrowRight size={20} />
      </Link>
    </main>
  );
}
