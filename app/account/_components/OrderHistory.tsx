import React, { useState, useEffect } from "react";
import OrderCard from "./OrderCard";

export default function OrderHistory() {
const [orders,setOrders] = useState([]);
  useEffect(() => {

    fetch("/api/orders",{method:"GET", credentials:"include"})
    .then((res)=>res.json())
    .then((data)=> setOrders(data.orders))
  }, []);
  return (
    <div className="mx-auto w-full space-y-4">
      {Array(5)
        .fill(0)
        .map((_, i) => (
          <OrderCard key={i} />
        ))}
    </div>
  );
}
