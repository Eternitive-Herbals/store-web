export const getOrders = async () => {
  const res = await fetch("/api/orders", { cache: "no-store" });
  const data = await res.json();
  
  if (!res.ok) {
    throw new Error(data?.message || data?.error || "Failed to fetch orders");
  }

  return data.orders;
};

export const updateOrder = async (id: string, orderData: any) => {
  const res = await fetch(`/api/orders/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderData),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.message || data?.error || "Failed to update order");
  }

  return data.order;
};

export const deleteOrder = async (id: string) => {
  const res = await fetch(`/api/orders/${id}`, {
    method: "DELETE",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.error || data?.message || "Failed to delete order");
  }

  return data;
};
