import Image from "next/image";
import Link from "next/link";
import Logo from "@/assets/brand-logo-white.svg";
import { Search, ShoppingBag, User } from "lucide-react";

export default function Header() {
  const links = [
    { name: "Home", href: "/" },
    { name: "Our Story", href: "/our-story" },
    { name: "Products", href: "/products" },
    { name: "Contact Us", href: "/contact-us" },
  ];

  return (
    <header className="fixed top-12 z-50 flex min-w-[calc(100%-10rem)] items-center justify-between place-self-center rounded-[20px] bg-[#1E1E1E]/66 px-12 py-4.5 text-white backdrop-blur-2xl">
      <Link
        className="flex items-center gap-2 transition-all hover:opacity-75 active:opacity-50"
        href={"/"}
      >
        <Image src={Logo} alt="athery logo" className="size-6" />
        <span className="font-comfortaa text-[20px] font-medium">aethery</span>
      </Link>

      <nav className="font-comfortaa flex items-center justify-between gap-10">
        {links.map((link, index) => (
          <Link
            href={link.href}
            key={index}
            className="underline decoration-transparent underline-offset-4 transition-all hover:decoration-white active:opacity-75"
          >
            <span className="text-lg tracking-wider">{link.name}</span>
          </Link>
        ))}
      </nav>

      <div className="flex gap-3">
        <button
          type="button"
          className="cursor-pointer transition-all hover:opacity-75 active:opacity-50"
        >
          <Search size={20} />
        </button>
        <Link
          href={"/cart"}
          className="transition-all hover:opacity-75 active:opacity-50"
        >
          <ShoppingBag size={20} />
        </Link>
        <Link
          href={"/"}
          className="transition-all hover:opacity-75 active:opacity-50"
        >
          <User size={20} />
        </Link>
      </div>
    </header>
  );
}
