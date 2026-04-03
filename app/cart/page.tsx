"use client";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function CartPage() {
  const [cart, setCart] = useState<any[]>([]);
  const [discount, setDiscount] = useState<number>(0);
  const [finalTotal, setFinalTotal] = useState<number>(0);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponCode, setCouponCode] = useState<string>("");
  const [isCouponOpen, setIsCouponOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchCart = async () => {
      const res = await fetch("/api/cart", {
        credentials: "include",
      });

      const data = await res.json();

      if (data.cart) {
        setCart(data.cart || []);
      } else {
        console.error(data.message);
      }
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

    if (data.cart) {
      setCart(data.cart.items);
    } else {
      console.error(data.message);
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    const res = await fetch("/api/cart", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ productId, quantity }),
    });

    const data = await res.json();
    console.log("API RESPONSE:", data);

    if (data.cart) {
      setCart(data.cart.items);
    } else {
      console.error(data.message);
    }
  };

  const subTotal = (cart: any[]) => {
    return cart.reduce((total, item) => {
      return total + Number(item.price) * item.quantity;
    }, 0);
  };

  async function applyCoupon(code?: string) {
    const couponToApply = (code || couponCode).trim().toUpperCase();

    if (!couponToApply) {
      alert("Enter Coupon Code");
    }

    const cartTotalForCheck = subTotal(cart);

    const res = await fetch("/api/coupon/apply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code: couponToApply,
        cartTotal: cartTotalForCheck,
      }),
    });

    const data = await res.json();

    if (!data.success) {
      if (data.minimumOrder) {
        alert(`Minimum order ₹${data.minimumOrder}`);
      } else {
        alert(data.message);
      }
      return;
    }

    setDiscount(data.discount);
    setFinalTotal(data.finalTotal);
    setAppliedCoupon(couponToApply);

    alert("Coupon applied!");
    setIsCouponOpen(false);
  }
  const calculatedTotal = subTotal(cart) - discount;
  return (
    <div className="h-screen bg-white px-20 pt-41">
      <div className="font-sf-pro-text grid h-full grid-cols-[2fr_1fr] gap-16">
        <div className="relative flex h-9/10 flex-col rounded-4xl bg-[#F9F8F6] p-8">
          <div className="border-primary-background/50 flex w-full items-center justify-between border-b pb-4">
            <h1 className="font-regular text-primary-background text-xl">
              Your Cart
            </h1>
            <p className="text-primary-background/50">
              {"(" + cart.length + ")"}
            </p>
          </div>
          {cart.map((item, index) => (
            <div className="w-full rounded-t-4xl px-8 pt-8" key={index}>
              <div className="flex h-fit items-start gap-6 p-4">
                <Image
                  src={item.image}
                  alt="items-image"
                  width={200}
                  height={200}
                  className="rounded-xl"
                />

                <div className="font-sf-pro-text flex h-50 w-full flex-col items-start justify-between gap-6">
                  <div className="">
                    <h2 className="font=medium text-2xl">{item.title}</h2>
                    <h3 className="text-lg text-[#6A7282]">
                      {item.description}
                    </h3>
                    {/* <p className="text-lg font-light text-[#6A7282]">
                      {item.description}
                    </p> */}
                    {/* <p className="text-lg font-light text-[#6A7282]">
                      {item.title}
                    </p> */}
                  </div>
                  <div className="flex w-full items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg text-gray-400 line-through">
                          {item.price}
                        </span>
                        <span className="text-2xl font-semibold text-gray-900">
                          {item.price}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-green-600">
                        ₹225 savings
                      </p>
                    </div>

                    <div className="flex items-center gap-4 rounded-full bg-white px-4 py-2">
                      {item.quantity == 1 ? (
                        <button
                          onClick={() => deleteItem(item.title)}
                          className="hover:text-primary-background text-[#99A1AF]"
                        >
                          <Trash2 size={22} />
                        </button>
                      ) : (
                        <button
                          onClick={() =>
                            updateQuantity(item._id, item.quantity - 1)
                          }
                          className="hover:text-primary-background text-[#99A1AF]"
                        >
                          <Minus size={22} />
                        </button>
                      )}
                      <span className="text-xl font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item._id, item.quantity + 1)
                        }
                        className="hover:text-primary-background text-[#99A1AF]"
                      >
                        <Plus size={22} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-5">
          <div className="flex items-center gap-4">
            <div className="border-primary-background/20 w-full rounded-2xl border p-4">
              <input
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                type="text"
                className="focus:none w-full bg-none placeholder:text-lg focus:border-transparent focus:ring-0 focus:outline-none"
                placeholder="Discount code"
              />
            </div>
            <button
              onClick={() => applyCoupon()}
              className="border-primary-background/20 w-fit rounded-2xl border p-4 px-8 font-medium"
            >
              Apply
            </button>
          </div>

          <div className="border-primary-background/20 space-y-5 rounded-2xl border p-6">
            <div className="flex w-full items-center justify-between text-xl">
              <span className="text-[#4A5565]">Subtotal</span>
              <span className="text-right text-[#4A5565]">
                {subTotal(cart)}
              </span>
            </div>
            <div className="flex w-full items-center justify-between text-xl">
              <span className="text-[#4A5565]">Subscription Discount</span>
              <span className="text-right text-[#4A5565] text-[#009966]">
                ₹{discount}
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
               ₹{calculatedTotal > 0 ? calculatedTotal : 0}
              </span>
            </div>
            <div className="bg-primary-background my-5 flex items-center justify-center rounded-full p-4 text-2xl font-medium text-white">
              Checkout
            </div>
            <div className="bg-primary-background/20 h-0.5" />

            <p className="text-center text-left text-sm font-light text-[#4A5565]">
              SECURE PAYMENTS PROVIDED BY
            </p>
            <div className=""></div>
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
