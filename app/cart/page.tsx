"use client";

import { Trash } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

type prod = {
  _id?: string;
  image: string;
  title: string;
  description: string;
  price: number | string;
};

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

  const deleteItem = async (title: string) => {
    const res = await fetch("/api/cart", {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ title }),
    });
    const data = await res.json();
    setCart(data.cart.items);
  };
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

          <button
            onClick={() => deleteItem(item.title)}
            className="flex cursor-pointer justify-end text-right text-red-500"
          >
            <Trash size={22} />
          </button>
        </div>
      ))}
    </div>
  );
}
