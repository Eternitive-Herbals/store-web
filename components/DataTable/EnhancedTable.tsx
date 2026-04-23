"use client";

import { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  ColumnDef,
  SortingState,
  FilterFn,
  flexRender,
} from "@tanstack/react-table";
import { rankItem } from "@tanstack/match-sorter-utils";
import { OrderType } from "@/types/OrderType";
import "../../app/globals.css";
// 👉 IMPORT YOUR MODULAR COMPONENTS
import TableSearch from "./TableSearch";
import TablePagination from "./TablePagination";
import { selectionColumn } from "./columns/selectionColumn";
import { actionColumn } from "./columns/actionColumn";
import TableBody from "./TableBody";

type Props = {
  data: OrderType[];
  columns: ColumnDef<OrderType>[];
  pageSize?: number;
  enableRowSelection?: boolean;
  enableActions?: boolean;
  title?: string;
  description?: string;
  onRowAction?: (action: string, row: OrderType) => void;
  LeftSection?: React.ReactNode;
};

// ✅ Fuzzy filter stays here (logic layer)
const fuzzyFilter: FilterFn<OrderType> = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(String(row.getValue(columnId)), value);
  addMeta({ itemRank });
  return itemRank.passed;
};

export default function EnhancedTable({
  data,
  columns,
  pageSize = 10,
  enableRowSelection = false,
  enableActions = false,
  title,
  description,
  leftSection,
  onRowAction,
}: Props) {
  // ✅ STATE (centralized)
  const [rowSelection, setRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize,
  });

  const selectedCount = Object.keys(rowSelection).length;

  // ✅ COLUMNS COMPOSITION
  const finalColumns = [
    ...(enableRowSelection ? [selectionColumn] : []),
    ...columns,
    ...(enableActions ? [actionColumn(onRowAction)] : []),
  ];

  // ✅ TABLE INSTANCE (core logic)
  const table = useReactTable<OrderType>({
    data,
    columns: finalColumns,
    filterFns: { fuzzy: fuzzyFilter },
    state: {
      globalFilter,
      sorting,
      pagination,
      rowSelection,
    },
    enableRowSelection,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const totalRows = table.getFilteredRowModel().rows.length;

  return (
    <div className="flex h-full flex-col rounded-xl  bg-none font-sf-pro-text ">
      {/* 🔹 HEADER */}
      <div className="space-y-4 py-5 ">
        <div>
          {title && (
            <h2 className=" font-semibold text-foreground font-sf-pro-text text-2xl">{title}</h2>
          )}
          {description && (
            <p className="mt-1 text-sm text-foreground/60 font-sf-pro-text">{description}</p>
          )}
        </div>

        {/* 🔹 SEARCH + SELECTION */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <TableSearch value={globalFilter} onChange={setGlobalFilter} />
       {leftSection}
          {enableRowSelection && selectedCount > 0 && (
            <div className="flex items-center gap-3 rounded-lg bg-blue-50 px-4 py-2">
              <span className="text-sm font-medium text-foreground">
                {selectedCount} selected
              </span>
              <button
                onClick={() => setRowSelection({})}
                className="text-xs text-blue-600 underline"
              >
                Clear
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 🔹 TABLE */}
      <div className="flex-1 overflow-auto">
        <table className="w-full ">
          <thead className="sticky top-0 bg-none py-30 ">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className="px-6 py-3 text-left text-xs font-semibold text-foreground uppercase"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <TableBody table={table} columnCount={finalColumns.length} />
        </table>
      </div>

      {/* 🔹 PAGINATION */}
      <div className="bg-primary-background/10 text-foreground px-6 py-4">
        <TablePagination table={table} totalRows={totalRows} />
      </div>
    </div>
  );
}
