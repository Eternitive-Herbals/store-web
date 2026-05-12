import React from "react";
import OrderCard from "./OrderCard";
import { useOrders } from "../hooks/useOrders";
import Link from "next/link";

export default function OrderHistory() {
  const { orders, loading } = useOrders();

  if (loading) {
    return (
      <div className="flex items-center justify-center p-10">
        <p className="text-primary-background/40">Loading orders...</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-10 gap-4">
        <p className="text-primary-background/60">No orders found.</p>
        <Link href="/products" className="bg-primary-background text-white px-6 py-2 rounded-full text-sm font-semibold hover:opacity-80 transition-opacity">
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full space-y-4">
      {orders.map((order: any) => (
        <OrderCard key={order._id} order={order} />
      ))}
    </div>
  );
}
