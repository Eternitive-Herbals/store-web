"use client";

import Image from "next/image";
import Link from "next/link";
import Logo from "@/assets/brand-logo-white.svg";
import { Search, ShoppingBag, User, UserStar  } from "lucide-react";
import { useState } from "react";
import SearchModal from "@/components/SearchModal";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { isLoggedIn, loading, user } = useAuth();
  const isAdmin = user?.role === "Admin";
  const router = useRouter();

  const links = [
    { name: "Home", href: "/" },
    { name: "Our Story", href: "/our-story" },
    { name: "Products", href: "/products" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="fixed top-12 z-50 min-w-[calc(100%-10rem)] place-self-center text-white">
      <div className="flex items-center justify-between rounded-[20px] border border-white/10 bg-[#1E1E1E]/66 px-12 py-4.5 backdrop-blur-2xl">
        <Link
          className="flex items-center gap-2 transition-all hover:opacity-75 active:opacity-50"
          href={"/"}
        >
          <Image src={Logo} alt="athery logo" className="size-6" />
          <span className="font-comfortaa text-[20px] font-medium">
            aethery
          </span>
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
            onClick={() => setIsSearchOpen(true)}
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
          {loading ? (
            <span className="animate-pulse">
              <User size={20} />
            </span>
          ) : (<>
            <button
              type="button"
              onClick={() => {
                if (loading) return;
                router.push(isLoggedIn ? "/account" : "/login");
              }}
              className="transition-all hover:opacity-75 active:opacity-50"
            >
              <User size={20} />
            </button>
            {isAdmin && (<button
              type="button"
              onClick={() => {
                if (loading) return;
                router.push("/admin/products");
              }}
              className="transition-all hover:opacity-75 active:opacity-50"
            >
              <UserStar size={20} />
            </button>)}
            </>
            
          )}
        </div>
      </div>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </header>
  );
}
