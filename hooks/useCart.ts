import { useAuth } from "@/context/AuthContext";
import { useCartContext } from "@/context/CartContext";

export function useCart() {
  const { user } = useAuth();
  const { setTotalQuantity, bumpCart } = useCartContext();

  const requestHeaders = {
    "Content-Type": "application/json",
    "x-user-id": user?._id?.toString() || "",
  };

  const getCart = async () => {
    if (!user?._id) return { items: [] };

    const res = await fetch("/api/cart", {
      headers: requestHeaders,
    });

    return res.json();
  };

  const syncContext = async () => {
    const cart = await getCart();
    setTotalQuantity(
      cart.items.reduce(
        (sum: number, item: { quantity: number }) => sum + item.quantity,
        0,
      ),
    );
    bumpCart();
  };

  const addToCart = async (item: unknown) => {
    await fetch("/api/cart", {
      method: "POST",
      headers: requestHeaders,
      body: JSON.stringify(item),
    });

    await syncContext();

    return { success: true };
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    await fetch("/api/cart", {
      method: "PUT",
      headers: requestHeaders,
      body: JSON.stringify({ productId, quantity }),
    });

    await syncContext();

    return { success: true };
  };

  const removeFromCart = async (productId: string) => {
    if (!user?._id) return;

    await fetch("/api/cart", {
      method: "DELETE",
      headers: requestHeaders,
      body: JSON.stringify({ productId }),
    });

    await syncContext();
  };

  return {
    getCart,
    addToCart,
    updateQuantity,
    removeFromCart,
  };
}
