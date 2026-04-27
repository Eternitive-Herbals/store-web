"use client";

import { X, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { OrderType } from "@/types/OrderType";

export default function OrderModal({
  open,
  onClose,
  onUpdate,
  mode = "view",
  initialData = null,
}: {
  open: boolean;
  onClose: () => void;
  onUpdate?: (orderData: any) => Promise<void>;
  mode?: "view" | "edit";
  initialData?: OrderType | null;
}) {
  const [shippingAddress, setShippingAddress] = useState("");
  const [status, setStatus] = useState("pending");
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open && initialData) {
      setShippingAddress(initialData.shippingAddress || "");
      setStatus(initialData.items?.[0]?.status || "pending");
      setItems(initialData.items || []);
    }
  }, [open, initialData]);

  const totalAmount = items.reduce((acc, item) => acc + (item.quantity * item.price), 0);

  const isView = mode === "view";

  if (!open || !initialData) return null;

  const handleQuantityChange = (idx: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    const newItems = [...items];
    newItems[idx].quantity = newQuantity;
    setItems(newItems);
  };

  const handleDeleteItem = (idx: number) => {
    const newItems = items.filter((_, i) => i !== idx);
    setItems(newItems);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (onUpdate) {
        await onUpdate({
          shippingAddress,
          status,
          items,
          totalAmount,
        });
      }
    } catch (error) {
      console.error(error);
      alert("Failed to update order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-sf-pro-text fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="bg-foreground/5 absolute inset-0 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-2xl max-h-[90vh] rounded-xl bg-white p-6 shadow-xl flex flex-col">
        <button
          onClick={onClose}
          className="bg-foreground/60 absolute top-0 -right-10 rounded-full p-1"
        >
          <X size={18} color="background" />
        </button>

        <h2 className="text-foreground mb-6 text-2xl font-bold">
          {isView ? "Order Details" : "Edit Order Status"}
        </h2>

        <div className="flex-1 overflow-y-auto pr-2 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-semibold text-foreground">Customer</p>
              <p className="text-sm text-gray-600">{initialData.user?.username}</p>
              <p className="text-xs text-gray-500">{initialData.user?.email}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Order Date</p>
              <p className="text-sm text-gray-600">
                {new Date(initialData.createdAt).toLocaleString()}
              </p>
            </div>
          </div>

          <div className="space-y-4  pt-4">
            <div>
              <label className="text-sm font-semibold text-foreground mb-1 block">
                Shipping Address
              </label>
              <textarea
                value={shippingAddress}
                onChange={(e) => setShippingAddress(e.target.value)}
                disabled={isView}
                className="border-foreground/20 focus:border-foreground/60 w-full rounded-lg border-2 px-3 py-2 text-sm outline-none disabled:bg-gray-50 disabled:text-gray-500"
                rows={3}
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-foreground mb-1 block">
                Order Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                disabled={isView}
                className="border-foreground/20 focus:border-foreground/60 w-full rounded-lg border-2 px-3 py-2 text-sm outline-none disabled:bg-gray-50 disabled:text-gray-500"
              >
                <option value="pending">Pending</option>
                <option value="paid">Paid</option>
                <option value="failed">Failed</option>
              </select>
            </div>
          </div>

          <div className=" pt-4">
            <h3 className="text-sm font-semibold text-foreground mb-3">Order Items</h3>
            <div className="space-y-3">
              {items.map((item: any, idx: number) => (
                <div key={idx} className="flex items-center gap-4 bg-gray-50 p-3 rounded-lg border-foreground/20 border-2">
                  {item.product?.image && (
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                  )}
                  <div className="flex-1">
                    <p className="text-sm font-medium">{item.product?.name || "Unknown Product"}</p>
                    {isView ? (
                      <p className="text-xs text-gray-500">
                        Qty: {item.quantity} × ₹{item.price}
                      </p>
                    ) : (
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-gray-500">Qty:</span>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => handleQuantityChange(idx, parseInt(e.target.value) || 1)}
                          className="w-16 border-foreground/20 focus:border-foreground/60 border-2 outline-none rounded px-2 py-1 text-xs"
                        />
                        <span className="text-xs text-gray-500">× ₹{item.price}</span>
                      </div>
                    )}
                  </div>
                  <div className="text-sm font-semibold">
                    ₹{item.quantity * item.price}
                  </div>
                  {!isView && (
                    <button
                      onClick={() => handleDeleteItem(idx)}
                      className="text-red-500 hover:bg-red-50 p-1.5 rounded transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-between items-center text-lg font-bold  pt-3">
              <span>Total Amount</span>
              <span>₹{totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3  pt-4">
          <button
            onClick={onClose}
            className="px-5 py-2 text-sm font-medium text-foreground hover:bg-gray-100 rounded-lg transition-colors"
          >
            {isView ? "Close" : "Cancel"}
          </button>
          {!isView && (
            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`${
                items.length === 0
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-primary-background hover:bg-primary-background/90"
              } disabled:opacity-50 flex items-center gap-2 rounded-lg px-6 py-2 text-sm font-medium text-white transition-colors`}
            >
              {loading ? "Processing..." : items.length === 0 ? "Cancel Order" : "Update Order"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
