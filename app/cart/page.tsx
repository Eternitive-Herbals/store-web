"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function CartPage() {
  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    const fetchCart = async () => {
      const res = await fetch("/api/cart", {
        credentials: "include",
      });

      const data = await res.json();
      setCart(data.cart);
    };

    fetchCart();
  }, []);

  return (
    <div className="p-10">
      <h1 className="mb-6 text-3xl">Your Cart</h1>

      {cart.map((item, index) => (
        <div
          key={index}
          className="mb-4 flex items-center gap-6 rounded-xl border p-4"
        >
          <Image src={item.image} alt="items-image" width={80} height={80} />

          <div>
            <h2 className="text-lg">{item.title}</h2>
            <p>₹{item.price}</p>
            <p>Quantity: {item.quantity}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
