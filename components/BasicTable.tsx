"use client";

import { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
  ColumnDef,
  SortingState,
  FilterFn,
} from "@tanstack/react-table";
import { rankItem } from "@tanstack/match-sorter-utils";
import { OrderType } from "@/types/OrderType";
import { Row } from "@tanstack/react-table";
import { ChevronDown, ChevronUp } from "lucide-react";

const fuzzyFilter: FilterFn<OrderType> = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(String(row.getValue(columnId)), value);
  addMeta({ itemRank });
  return itemRank.passed;
};

function BasicTable({
  data,
  columns,
  pageSize = 10,

  enableRowSelection = false,
  enableActions = false,
}: {
  data: OrderType[];
  columns: ColumnDef<OrderType>[];
  pageSize?: number;
  enableRowSelection?: boolean;
  enableActions?: boolean;
}) {
  const [rowSelection, setRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState("");

  const [sorting, setSorting] = useState<SortingState>([]);

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize,
  });

  const selectionColumn: ColumnDef<OrderType> = {
    id: "select",
    header: ({ table }) => (
      <input
        type="checkbox"
        checked={table.getIsAllRowsSelected()}
        onChange={table.getToggleAllRowsSelectedHandler()}
      />
    ),
    cell: ({ row }) => (
      <input
        type="checkbox"
        checked={row.getIsSelected()}
        onChange={row.getToggleSelectedHandler()}
      />
    ),
  };

  const actionColumn: ColumnDef<OrderType> = {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="relative">
        <button className="border px-2 py-1">⋮</button>

        {/* Replace with dropdown if using shadcn */}
        <div className="absolute hidden border bg-white p-2 group-hover:block">
          <button onClick={() => console.log("View", row.original)}>
            View
          </button>
          <button onClick={() => console.log("Edit", row.original)}>
            Edit
          </button>
          <button onClick={() => console.log("Delete", row.original)}>
            Delete
          </button>
        </div>
      </div>
    ),
  };

  const finalColumns = [
    ...(enableRowSelection ? [selectionColumn] : []),
    ...columns,
    ...(enableActions ? [actionColumn] : []),
  ];
  const table = useReactTable<OrderType>({
    data,

    columns: finalColumns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    enableRowSelection: enableRowSelection,
    onRowSelectionChange: setRowSelection,

    state: {
      globalFilter,
      sorting,
      pagination,
      rowSelection,
    },
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,

    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const isRowHighlighted = (row: Row<OrderType>) => {
    const id = row.original.order_id;
    return id % 2 !== 0;
  };

  return (
    <div className="p-4">
      <input
        type="text"
        value={globalFilter ?? ""}
        onChange={(e) => setGlobalFilter(e.target.value)}
        placeholder="Search..."
        className="mb-4 w-full max-w-xs rounded border p-2"
      />

      <table className="w-full">
        <thead className="">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="bg-transparent">
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  colSpan={header.colSpan}
                  onClick={header.column.getToggleSortingHandler()}
                  className="cursor-pointer px-2 py-4 pl-1 text-left text-nowrap"
                >
                  <div className="flex items-center gap-4 font-medium">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}

                    {{
                      asc: <ChevronUp size={16} />,
                      desc: <ChevronDown size={16} />,
                    }[header.column.getIsSorted() as string] ?? null}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="p-4 text-center">
                No data found
              </td>
            </tr>
          ) : (
            table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className={`${isRowHighlighted(row) ? "bg-primary-background/5" : "bg-transparent"} text-nowrap`}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="p-2">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex gap-2">
          <button
            onClick={() => table.firstPage()}
            disabled={!table.getCanPreviousPage()}
            className="border px-2 py-1 disabled:opacity-50"
          >
            {"<<"}
          </button>

          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="border px-2 py-1 disabled:opacity-50"
          >
            {"<"}
          </button>

          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="border px-2 py-1 disabled:opacity-50"
          >
            {">"}
          </button>

          <button
            onClick={() => table.lastPage()}
            disabled={!table.getCanNextPage()}
            className="border px-2 py-1 disabled:opacity-50"
          >
            {">>"}
          </button>
        </div>

        <span>
          Page{" "}
          <strong>
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </strong>
        </span>
      </div>
    </div>
  );
}

export default BasicTable;
