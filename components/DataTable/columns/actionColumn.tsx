"use client"
import RowActions from "../RowActions";
export const actionColumn = (onRowAction: any) => ({
  id: "actions",
  cell: ({ row }: any) => (
    <RowActions row={row.original} onAction={onRowAction} />
  ),
});