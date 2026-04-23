export type OrderType = 
   {
  order_id: number;
  customer_id: number;
  product_id: number;
  quantity: number;
  unit_price: number;
  total_price: number;
  order_date: string; // consider Date if you parse it
  shipping_address: string;
  payment_method: "PayPal" | string; // can expand to enum if needed
  status: "Shipped" | "Pending" | "Delivered" | "Cancelled" | string;
};

