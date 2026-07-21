"use client";
import { Menu, X, Search, ShoppingBag, User, UserStar } from "lucide-react";
import Link from "next/link";
import { NAVIGATION } from "./navigation";
import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
interface Props {
  open: boolean;
  setOpen(value: boolean): void;
  onSearch(): void;
}
export default function MobileMenu({ open, setOpen, onSearch }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const { isLoggedIn, user } = useAuth();
  const isAdmin = user?.role === "Admin";
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);
  useEffect(() => {
    setOpen(false);
  }, [pathname, setOpen]);
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [setOpen]);
  return (
    <>
      <div className="flex items-center gap-1 lg:hidden text-background">
        <button
          onClick={onSearch}
          className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-white/10"
        >
          <Search size={20} />
        </button>
        <Link
          href="/cart"
          className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-white/10"
        >
          <ShoppingBag size={20} />
        </Link>
        <button
          onClick={() => setOpen(true)}
          className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-white/10"
        >
          <Menu />
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/50"
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                duration: 0.35,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="fixed top-0 right-0 h-screen w-80 bg-[#111] p-8"
            >
              <div className="flex justify-end">
                <button onClick={() => setOpen(false)}>
                  <X />
                </button>
              </div>
              <nav className="mt-12 flex flex-col gap-6">
                {NAVIGATION.map((item) => (
                  <Link key={item.href} href={item.href} className="text-lg">
                    {item.name}
                  </Link>
                ))}
              </nav>
              <div className="mt-12 flex flex-col gap-5">
                <button
                  onClick={() =>
                    router.push(isLoggedIn ? "/account" : "/login")
                  }
                  className="flex items-center gap-3"
                >
                  <User />
                  Account
                </button>
                {isAdmin && (
                  <button
                    onClick={() => router.push("/admin/products")}
                    className="flex items-center gap-3"
                  >
                    <UserStar />
                    Admin Dashboard
                  </button>
                )}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
