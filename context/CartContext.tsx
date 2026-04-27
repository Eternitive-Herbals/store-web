"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

type CartContextType = {
  totalQuantity: number;
  setTotalQuantity: (n: number) => void;
  cartVersion: number;
  bumpCart: () => void;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [cartVersion, setCartVersion] = useState(0);

  const { user } = useAuth();

  const bumpCart = () => setCartVersion((v) => v + 1);

  useEffect(() => {
    async function syncCart() {
      if (!user?._id) {
        setTotalQuantity(0);
        return;
      }

      try {
        const res = await fetch("/api/cart", {
          cache: "no-store",
          credentials: "include",
        });
        const data = await res.json();

        const items = data.cart || [];

        setTotalQuantity(
          items.reduce(
            (sum: number, item: { quantity: number }) => sum + item.quantity,
            0,
          ),
        );
      } catch (error) {
        console.error("failed to sync cart:", error);
        setTotalQuantity(0);
      }
    }

    syncCart();
  }, [user, cartVersion]);

  return (
    <CartContext.Provider
      value={{
        totalQuantity,
        setTotalQuantity,
        cartVersion,
        bumpCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCartContext must be used inside CartProvider");
  return ctx;
}
