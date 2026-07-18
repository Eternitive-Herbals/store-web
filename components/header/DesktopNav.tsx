"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAVIGATION } from "./navigation";

export default function DesktopNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Main Navigation"
      className="font-comfortaa hidden items-center gap-10 lg:flex"
    >
      {NAVIGATION.map((link) => {
        const active = pathname === link.href;

        return (
          <Link
            key={link.href}
            href={link.href}
            className={`relative transition-all duration-300 ${
              active ? "text-white" : "text-white/80 hover:text-white"
            }`}
          >
            {link.name}

            <span
              className={`absolute -bottom-1 left-0 h-[2px] bg-white transition-all duration-300 ${
                active ? "w-full" : "w-0"
              }`}
            />
          </Link>
        );
      })}
    </nav>
  );
}
