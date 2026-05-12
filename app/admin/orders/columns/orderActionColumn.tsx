"use client";

import { ColumnDef } from "@tanstack/react-table";
import OrderRowActions from "../components/OrderRowActions";
import { OrderType } from "@/types/OrderType";

export const orderActionColumn = (
  onRowAction?: (action: string, row: OrderType) => void
): ColumnDef<OrderType> => ({
  id: "actions",
  cell: ({ row }) => (
    <div onClick={(e) => e.stopPropagation()}>
      <OrderRowActions
        row={row.original}
        onAction={onRowAction}
      />
    </div>
  ),
});
