"use client";

import Image from "next/image";
import Link from "next/link";
import Logo from "@/assets/brand-logo-white.svg";
import { Search, ShoppingBag, User, UserStar  } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Header() {
  const [searchVisiblity, setSearchVisibility] = useState(false);
  const [query, setQuery] = useState("");
  const { isLoggedIn, loading, user } = useAuth();
  const isAdmin = user?.role === "Admin";
  const searchRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const links = [
    { name: "Home", href: "/" },
    { name: "Our Story", href: "/our-story" },
    { name: "Products", href: "/products" },
    { name: "Contact", href: "/contact" },
  ];


  useEffect(() => {
    if (searchVisiblity) {
      searchRef.current?.focus();
    }
  }, [searchVisiblity]);

  function toggleSearchVisibility() {
    setSearchVisibility((prev) => !prev);
  }
  const handleSearch = () => {
    if (!query.trim()) return;

    router.push(`/search?query=${encodeURIComponent(query)}`);
    setSearchVisibility(false);
  };

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
            onClick={toggleSearchVisibility}
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

      <AnimatePresence>
        {searchVisiblity && (
          <motion.div
            initial={{ y: -5, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -5, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="search_bar absolute right-0 -bottom-full flex w-full max-w-2xl items-center gap-2.75 rounded-[20px] border border-white/10 bg-[#1E1E1E]/66 p-2.75 backdrop-blur-2xl"
          >
            <input
              type="text"
              name="search"
              id="search"
              ref={searchRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="bg-background/10 w-full rounded-[10px] px-4 py-2 text-white outline-none"
            />
            <button
              type="button"
              onClick={handleSearch}
              className="bg-background cursor-pointer rounded-[10px] px-4 py-2 transition-all hover:opacity-75 active:opacity-50"
            >
              <span className="text-foreground font-comfortaa font-bold">
                Search
              </span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
