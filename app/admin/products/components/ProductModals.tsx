"use client";

import ProductModal from "@/components/ProductModal";
import { ProductType } from "@/types/ProductType";

type Props = {
  selectedProduct: ProductType | null;

  openView: boolean;
  openEdit: boolean;
  openCreate: boolean;

  setOpenView: (v: boolean) => void;
  setOpenEdit: (v: boolean) => void;
  setOpenCreate: (v: boolean) => void;

  onCreate: (data: any) => Promise<void>;
  onUpdate: (data: any) => Promise<void>;
};

export default function ProductModals({
  selectedProduct,
  openView,
  openEdit,
  openCreate,
  setOpenView,
  setOpenEdit,
  setOpenCreate,
  onCreate,
  onUpdate,
}: Props) {
  return (
    <>
      {/* View */}
      <ProductModal
        open={openView}
        onClose={() => setOpenView(false)}
        mode="view"
        initialData={selectedProduct}
      />

      {/* Edit */}
      <ProductModal
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        mode="edit"
        initialData={selectedProduct}
        onCreate={onUpdate}
      />

      {/* Create */}
      <ProductModal
        open={openCreate}
        onClose={() => setOpenCreate(false)}
        mode="create"
        onCreate={onCreate}
      />
    </>
  );
}