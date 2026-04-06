import { useAuth } from "@/context/AuthContext";
import { useCartContext } from "@/context/CartContext";

export function useCart() {
  const { user } = useAuth();
  const { setTotalQuantity, bumpCart } = useCartContext();

  const requestHeaders = {
    "Content-Type": "application/json",
  };

  const getCart = async () => {
    if (!user?._id) return { items: [] };

    const res = await fetch("/api/cart", {
      headers: requestHeaders,
      credentials: "include",
    });

    return res.json();
  };

  const syncContext = async () => {
    const cart = await getCart();

    const items = cart.cart || cart.items || [];

    setTotalQuantity(
      items.reduce(
        (sum: any, item: { quantity: unknown }) => sum + item.quantity,
        0,
      ),
    );
  };

  const addToCart = async (item: unknown) => {
    const res = await fetch("/api/cart", {
      method: "POST",
      headers: requestHeaders,
      credentials: "include",
      body: JSON.stringify(item),
    });

    const data = await res.json();

    await syncContext();

    return data;
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    const res = await fetch("/api/cart", {
      method: "PUT",
      headers: requestHeaders,
      credentials: "include",
      body: JSON.stringify({ productId, quantity }),
    });

    const data = await res.json();

    await syncContext();

    return data;
  };

  const removeFromCart = async (productId: string) => {
    const res = await fetch("/api/cart", {
      method: "DELETE",
      headers: requestHeaders,
      credentials: "include",
      body: JSON.stringify({ productId }),
    });

    const data = await res.json();

    await syncContext();

    return data;
  };

  return {
    getCart,
    addToCart,
    updateQuantity,
    removeFromCart,
  };
}
