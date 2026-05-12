"use client";

import { useState } from "react";
import { useOrderFilters } from "./hooks/useOrderFilters";
import { useOrders } from "./hooks/useOrders";
import { orderHandlers } from "./handlers/orderHandlers";

import OrderTableSection from "./components/OrderTableSection";
import OrderModals from "./components/OrderModals";
import { OrderType } from "@/types/OrderType";

export default function OrdersPage() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [selectedOrder, setSelectedOrder] = useState<OrderType | null>(null);

  const [openView, setOpenView] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const { filters, setFilters } = useOrderFilters();
  const { orders } = useOrders(filters, refreshKey);

  const { handleUpdate, handleDelete } = orderHandlers({
    setRefreshKey,
    setOpenEditModal: setOpenEdit,
    selectedOrder,
  });

  const handleRowAction = (action: string, row: OrderType) => {
    if (action === "view") {
      setSelectedOrder(row);
      setOpenView(true);
    }
    if (action === "edit") {
      setSelectedOrder(row);
      setOpenEdit(true);
    }
    if (action === "delete") {
      if (confirm("Are you sure you want to delete this order?")) {
        handleDelete(row._id);
      }
    }
  };
  console.log(orders);
  return (
    <>
      <OrderTableSection
        orders={orders}
        filters={filters}
        setFilters={setFilters}
        onRowAction={handleRowAction}
        onRowClick={(row) => {
          setSelectedOrder(row);
          setOpenView(true);
        }}
      />

      <OrderModals
        selectedOrder={selectedOrder}
        openView={openView}
        openEdit={openEdit}
        setOpenView={setOpenView}
        setOpenEdit={setOpenEdit}
        onUpdate={handleUpdate}
      />
    </>
  );
}
