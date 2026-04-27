"use client";

import { ColumnDef } from "@tanstack/react-table";
import RowActions from "../RowActions";

export const actionColumn = <T,>(
  onRowAction?: (action: string, row: T) => void
): ColumnDef<T> => ({
  id: "actions",

  cell: ({ row }) => (
    <div onClick={(e)=>e.stopPropagation()}>
    <RowActions
   className="cursor-pointer"
      row={row.original as T}
      onAction={onRowAction}
    />
    </div>
  ),
});