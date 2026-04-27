"use client";

import { useState , useCallback} from "react";
import { useFilters } from "./hooks/useFilters";
import { useProducts } from "./hooks/useProducts";
import { useMeta } from "./hooks/useMeta";
import { productHandlers } from "./handlers/productHandlers";

import ProductTableSection from "./components/ProductTableSection";
import ProductModals from "./components/ProductModals";

import { createCategory } from "@/lib/categoryAction";
import { createGoal } from "@/lib/goalAction";
import { ProductType } from "@/types/ProductType";

export default function Page() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [sortBy, setSortBy] = useState("featured");

  const [selectedProduct, setSelectedProduct] =
    useState<ProductType | null>(null);

  const [openView, setOpenView] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);

  const { filters, setFilters } = useFilters();
  const { products } = useProducts(filters, sortBy, refreshKey);
  const { categories, goals, setCategories, setGoals } = useMeta();

  const { handleCreate, handleUpdate, handleDelete } = productHandlers({
    setRefreshKey,
    setOpenCreateModal: setOpenCreate,
    setOpenEditModal: setOpenEdit,
    selectedProduct,
  });

  const handleRowAction = useCallback((action: string, row: ProductType) => {
    if (action === "view") {
      setSelectedProduct(row);
      setOpenView(true);
    }

    if (action === "edit") {
      setSelectedProduct(row);
      setOpenEdit(true);
    }

    if (action === "delete") {
      if (confirm("Delete product?")) {
        handleDelete(row._id);
      }
    }
  },[]);

  return (
    <>
      <ProductTableSection
        products={products}
        categories={categories}
        goals={goals}
        filters={filters}
        setFilters={setFilters}
        onCreateCategory={async (val) => {
          await createCategory(val);
          setCategories((p) => [...p, val]);
        }}
        onCreateGoal={async (val, img) => {
          await createGoal(val, img);
          setGoals((p) => [...p, val]);
        }}
        onRowAction={handleRowAction}
        onRowClick={(row) => {
          setSelectedProduct(row);
          setOpenView(true);
        }}
        openCreateModal={() => setOpenCreate(true)}
      />

      <ProductModals
        selectedProduct={selectedProduct}
        openView={openView}
        openEdit={openEdit}
        openCreate={openCreate}
        setOpenView={setOpenView}
        setOpenEdit={setOpenEdit}
        setOpenCreate={setOpenCreate}
        onCreate={handleCreate}
        onUpdate={handleUpdate}
      />
    </>
  );
}