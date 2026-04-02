"use client";

import { Minus, Plus, Trash, Trash2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import prod from "@/assets/product/Frame 1437253859.png";

type prod = {
  _id?: string;
  image: string;
  title: string;
  description: string;
  price: number | string;
};

export default function CartPage() {
  const [cart, setCart] = useState<any[]>([]);

  const [quantity, setQuantity] = useState(1);

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
    <div className="h-screen bg-white px-20 pt-41">
      <div className="font-sf-pro-text grid h-full grid-cols-[2fr_1fr] gap-16">
        <div className="relative h-9/10 rounded-4xl bg-[#F9F8F6] p-8">
          <div className="absolute top-0 left-0 w-full rounded-t-4xl bg-[#F9F8F6] px-8 pt-8">
            <div className="border-primary-background/50 flex w-full items-center justify-between border-b pb-4">
              <h1 className="font-regular text-primary-background text-xl">
                Your Cart
              </h1>
              <p className="text-primary-background/50">{"(" + cart + ")"} </p>
            </div>

            <div className="flex h-fit items-start gap-6 p-4">
              <Image
                src={prod}
                alt="items-image"
                width={200}
                height={200}
                className="rounded-xl"
              />

              <div className="font-sf-pro-text flex h-50 w-full flex-col items-start justify-between gap-6">
                <div className="">
                  <h2 className="font=medium text-2xl">Rest & Renew</h2>
                  <h3 className="text-lg text-[#6A7282]">Deep Sleep Support</h3>
                  <p className="text-lg font-light text-[#6A7282]">
                    60 capsules
                  </p>
                  <p className="text-lg font-light text-[#6A7282]">
                    60 capsules
                  </p>
                </div>
                <div className="flex w-full items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg text-gray-400 line-through">
                        ₹1,499
                      </span>
                      <span className="text-2xl font-semibold text-gray-900">
                        ₹1,274
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-green-600">₹225 savings</p>
                  </div>

                  <div className="flex items-center gap-4 rounded-full bg-white px-4 py-2">
                    {quantity == 1 ? (
                      <button className="hover:text-primary-background text-[#99A1AF]">
                        <Trash2 size={22} />
                      </button>
                    ) : (
                      <button
                        onClick={() => setQuantity(quantity - 1)}
                        className="hover:text-primary-background text-[#99A1AF]"
                      >
                        <Minus size={22} />
                      </button>
                    )}
                    <span className="text-xl font-medium">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="hover:text-primary-background text-[#99A1AF]"
                    >
                      <Plus size={22} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-5">
          <div className="flex items-center gap-4">
            <div className="border-primary-background/20 w-full rounded-2xl border p-4">
              <input
                type="text"
                className="focus:none w-full bg-none placeholder:text-lg focus:border-transparent focus:ring-0 focus:outline-none"
                placeholder="Discount code"
              />
            </div>
            <button className="border-primary-background/20 w-fit rounded-2xl border p-4 px-8 font-medium">
              Apply
            </button>
          </div>

          <div className="border-primary-background/20 space-y-5 rounded-2xl border p-6">
            <div className="flex w-full items-center justify-between text-xl">
              <span className="text-[#4A5565]">Subtotal</span>
              <span className="text-right text-[#4A5565]">₹1,499.00</span>
            </div>
            <div className="flex w-full items-center justify-between text-xl">
              <span className="text-[#4A5565]">Subscription Discount</span>
              <span className="text-right text-[#4A5565] text-[#009966]">
                ~₹225.00
              </span>
            </div>
            <div className="flex w-full items-center justify-between text-xl">
              <span className="text-[#4A5565]">Shipping</span>
              <span className="text-primary-background text-righ font-semibold">
                FREE
              </span>
            </div>
            <div className="bg-primary-background/20 h-0.5" />
            <div className="flex w-full items-center justify-between text-xl">
              <span className="text-primary-background font-semibold">
                Estimated Total
              </span>

              <span className="text-primary-background text-righ font-semibold">
                ₹1,275.00
              </span>
            </div>
            <div className="bg-primary-background my-5 flex items-center justify-center rounded-full p-4 text-2xl font-medium text-white">
              Checkout
            </div>
            <div className="bg-primary-background/20 h-0.5" />

            <p className="text-center font-light text-left text-sm text-[#4A5565]">SECURE PAYMENTS PROVIDED BY</p>
            <div className="">
              
            </div>
          </div>
        </div>
      </div>

      {/* {cart.map((item, index) => (
        <div
          key={index}
          className="mb-4 flex items-center gap-6  p-4"
        >
          <Image src={item.image} alt="items-image" width={80} height={80} className="rounded-xl" />

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
      ))} */}
    </div>
  );
}