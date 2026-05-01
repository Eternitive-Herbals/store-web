import { ChevronRight } from "lucide-react";
import React from "react";

type OrderCardProps = {
  order: any;
};

export default function OrderCard({ order }: OrderCardProps) {
  const items = order.items || [];
  const prodCount = items.length;
  const displayedItems = items.slice(0, 3);
  const remainingCount = prodCount > 3 ? prodCount - 3 : 0;

  return (
    <div className="justfy-between flex h-fit w-full items-center gap-5 rounded-2xl bg-[#F9F8F6] p-5">
      <div className="flex items-center gap-2">
        {displayedItems.map((item: any, i: number) => (
          <div key={i} className="size-21 overflow-hidden rounded-xl bg-gray-200">
             {item.product?.image ? (
                <img 
                  src={item.product.image} 
                  alt={item.product.name} 
                  className="h-full w-full object-cover"
                />
             ) : (
                <div className="h-full w-full bg-gray-300" />
             )}
          </div>
        ))}
        {remainingCount > 0 && (
          <div className="bg-primary-background flex size-10 items-center justify-center rounded-full">
            <h1 className="font-bold text-white">
              {"+"}
              {remainingCount}
            </h1>
          </div>
        )}
      </div>

      <div className="bg-primary-background/20 h-16 w-0.5" />
      <div className="flex w-full items-start justify-between">
        <div className="font-sf-pro-text text-primary-background text-left text-lg">
          <h1 className="font-semibold truncate max-w-[200px]">
            Order #{order._id.slice(-6).toUpperCase()}
          </h1>
          <p className="font-regular text-primary-background/40">
            {new Date(order.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </p>
          <p className="text-xs uppercase font-bold mt-1" style={{ color: order.status === 'paid' ? '#10b981' : '#f59e0b' }}>
            {order.status || 'pending'}
          </p>
        </div>

        <button className="my-auto">
          <ChevronRight size={20} className="text-primary-background" />
        </button>
      </div>
    </div>
  );
}
