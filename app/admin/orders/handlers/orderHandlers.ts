import { updateOrder, deleteOrder } from "@/lib/orderAction";

export function orderHandlers({
  setRefreshKey,
  setOpenEditModal,
  selectedOrder,
}: any) {
  const handleUpdate = async (data: any) => {
    if (!selectedOrder) return;
    await updateOrder(selectedOrder._id, data);
    setOpenEditModal(false);
    setRefreshKey((p: number) => p + 1);
  };

  const handleDelete = async (id: string) => {
    await deleteOrder(id);
    setRefreshKey((p: number) => p + 1);
  };

  return { handleUpdate, handleDelete };
}
