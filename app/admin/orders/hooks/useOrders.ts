import { useEffect, useState } from "react";
import { OrderType } from "@/types/OrderType";

export function useOrders(filters: any, refreshKey: number) {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<OrderType[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);

        const params = new URLSearchParams();

        if (filters.status) {
          params.append("status", filters.status);
        }

        const res = await fetch(`/api/orders?${params.toString()}`);
        const data = await res.json();

        setOrders(data.orders || []);
      } catch (error) {
        console.error("Fetch failed:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [filters, refreshKey]);

  return { orders, loading };
}
