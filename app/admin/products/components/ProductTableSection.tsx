"use client";

import EnhancedTable from "@/components/DataTable/EnhancedTable";
import DropdownWithCreate from "@/components/DropdownWithCreate";
import { ProductType } from "@/types/ProductType";
import { productColumns } from "../../columns/ProductColumn";
import { productActionColumn } from "../columns/productActionColumn";
import { useMemo } from "react";

type Props = {
  products: ProductType[];
  categories: string[];
  goals: string[];
  filters: any;
  setFilters: any;
  onCreateCategory: (val: string) => void;
  onCreateGoal: (val: string, imageUrl?: string) => void;
  onRowAction: (action: string, row: ProductType) => void;
  onRowClick: (row: ProductType) => void;
  openCreateModal: () => void;
};

export default function ProductTableSection({
  products,
  categories,
  goals,
  filters,
  setFilters,
  onCreateCategory,
  onCreateGoal,
  onRowAction,
  onRowClick,
  openCreateModal,
}: Props) {
  const columns = useMemo(() => {
  return [...productColumns, productActionColumn(onRowAction)];
}, [onRowAction]);
  return (
    <EnhancedTable<ProductType>
      data={products}
      columns={columns}
      title="Products"
      description="Manage all your products here"
      enableRowSelection
      enableActions={false}
      onRowAction={onRowAction}
      pageSize={20}
      onRowClick={onRowClick}
      LeftSection={
        <div className="flex items-center gap-4">
          <DropdownWithCreate
            options={categories}
            value={filters.categories[0]}
            placeholder="Category: All"
            allOptionsLabel="All Categories"
            onChange={(val) =>
              setFilters((prev: any) => ({
                ...prev,
                categories: val ? [val] : [],
              }))
            }
            onCreate={onCreateCategory}
          />

          <DropdownWithCreate
            options={goals}
            value={filters.goals[0]}
            placeholder="Goal: All"
            allOptionsLabel="All Goals"
            onChange={(val) =>
              setFilters((prev: any) => ({
                ...prev,
                goals: val ? [val] : [],
              }))
            }
            onCreate={onCreateGoal}
            isImageUpload
          />

          <button
            onClick={openCreateModal}
            className="bg-primary-background hover:bg-primary-background/90 ml-2 flex items-center gap-2 rounded-full px-5 py-2 text-sm text-white"
          >
            Create Product +
          </button>
        </div>
      }
    />
  );
}