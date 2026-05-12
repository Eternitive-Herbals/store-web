"use client";

import { ColumnDef } from "@tanstack/react-table";
import ProductRowActions from "../components/ProductRowActions";
import { ProductType } from "@/types/ProductType";

export const productActionColumn = (
  onRowAction?: (action: string, row: ProductType) => void
): ColumnDef<ProductType> => ({
  id: "actions",
  cell: ({ row }) => (
    <div onClick={(e) => e.stopPropagation()}>
      <ProductRowActions
        row={row.original}
        onAction={onRowAction}
      />
    </div>
  ),
});
