"use client";

import OrderModal from "./OrderModal";
import { OrderType } from "@/types/OrderType";

type Props = {
  selectedOrder: OrderType | null;

  openView: boolean;
  openEdit: boolean;

  setOpenView: (v: boolean) => void;
  setOpenEdit: (v: boolean) => void;

  onUpdate: (data: any) => Promise<void>;
};

export default function OrderModals({
  selectedOrder,
  openView,
  openEdit,
  setOpenView,
  setOpenEdit,
  onUpdate,
}: Props) {
  return (
    <>
      <OrderModal
        open={openView}
        onClose={() => setOpenView(false)}
        mode="view"
        initialData={selectedOrder}
      />

      <OrderModal
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        mode="edit"
        initialData={selectedOrder}
        onUpdate={onUpdate}
      />
    </>
  );
}
