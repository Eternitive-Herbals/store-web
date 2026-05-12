import { createProduct, updateProduct, deleteProduct } from "@/lib/productAction";

export function productHandlers({
  setRefreshKey,
  setOpenCreateModal,
  setOpenEditModal,
  selectedProduct,
}: any) {
  const handleCreate = async (data: any) => {
    await createProduct(data);
    setOpenCreateModal(false);
    setRefreshKey((p: number) => p + 1);
  };

  const handleUpdate = async (data: any) => {
    if (!selectedProduct) return;
    await updateProduct(selectedProduct._id, data);
    setOpenEditModal(false);
    setRefreshKey((p: number) => p + 1);
  };

  const handleDelete = async (id: string) => {
    await deleteProduct(id);
    setRefreshKey((p: number) => p + 1);
  };

  return { handleCreate, handleUpdate, handleDelete };
}