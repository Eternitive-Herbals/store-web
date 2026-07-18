"use client";

import { useState } from "react";

import Image from "next/image";

import Link from "next/link";

import Logo from "@/assets/brand-logo-white.svg";

import SearchModal from "@/components/SearchModal";

import DesktopNav from "./DesktopNav";

import HeaderActions from "./HeaderActions";

import MobileMenu from "./MobileMenu";

export default function Header() {
  const [searchOpen, setSearchOpen] = useState(false);

  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="fixed inset-x-0 top-4 z-50 px-4 md:px-8 lg:px-12">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between rounded-2xl border border-white/10 bg-[#1E1E1E]/70 px-6 backdrop-blur-xl">
          <Link href="/" className="flex items-center gap-2">
            <Image src={Logo} alt="Logo" className="h-6 w-6" />

            <span className="font-comfortaa text-lg">aethery</span>
          </Link>

          <DesktopNav />

          <HeaderActions onSearch={() => setSearchOpen(true)} />

          <MobileMenu
            open={mobileOpen}
            setOpen={setMobileOpen}
            onSearch={() => setSearchOpen(true)}
          />
        </div>
      </header>

      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
