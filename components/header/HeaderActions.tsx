"use client";

import Link from "next/link";
import { Search, ShoppingBag, User, UserStar } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

interface Props {
  onSearch(): void;
}

export default function HeaderActions({ onSearch }: Props) {
  const router = useRouter();

  const { loading, isLoggedIn, user } = useAuth();

  const isAdmin = user?.role === "Admin";

  return (
    <div className="hidden items-center gap-2 lg:flex  text-background">
      <button
        aria-label="Search"
        onClick={onSearch}
        className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-white/10"
      >
        <Search size={20} />
      </button>

      <Link
        aria-label="Cart"
        href="/cart"
        className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-white/10"
      >
        <ShoppingBag size={20} />
      </Link>

      {loading ? (
        <div className="h-10 w-10 animate-pulse rounded-full bg-white/10" />
      ) : (
        <>
          <button
            aria-label="Account"
            onClick={() => router.push(isLoggedIn ? "/account" : "/login")}
            className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-white/10"
          >
            <User size={20} />
          </button>

          {isAdmin && (
            <button
              aria-label="Admin Dashboard"
              onClick={() => router.push("/admin/products")}
              className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-white/10"
            >
              <UserStar size={20} />
            </button>
          )}
        </>
      )}
    </div>
  );
}
