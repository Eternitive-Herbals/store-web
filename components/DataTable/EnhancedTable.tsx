"use client";

import {  useMemo, useState } from "react";
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

import "../../app/globals.css";

import TableSearch from "./TableSearch";
import TablePagination from "./TablePagination";
import { selectionColumn } from "./columns/selectionColumn";
import { actionColumn } from "./columns/actionColumn";
import TableBody from "./TableBody";

type Props<T> = {
  data: T[];
  columns: ColumnDef<T>[];
  pageSize?: number;
  enableRowSelection?: boolean;
  enableActions?: boolean;
  title?: string;
  description?: string;
  onRowAction?: (action: string, row: T) => void;
  LeftSection?: React.ReactNode;
  onRowClick?: (row: T) => void;
};

// ✅ Fuzzy filter stays here (logic layer)
const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(String(row.getValue(columnId)), value);
  addMeta({ itemRank });
  return itemRank.passed;
};

export default function EnhancedTable<T>({
  data,
  columns,
  pageSize = 10,
  enableRowSelection = false,
  enableActions = false,
  title,
  description,
  LeftSection,
  onRowAction,
  onRowClick,
}: Props<T>) {
  const [rowSelection, setRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize,
  });

  const selectedCount = Object.keys(rowSelection).length;

  // ✅ COLUMNS COMPOSITION
  const finalColumns = useMemo(() => {
  return [
    ...(enableRowSelection ? [selectionColumn] : []),
    ...columns,
    ...(enableActions ? [actionColumn<T>(onRowAction)] : []),
  ];
}, [columns, enableRowSelection, enableActions, onRowAction]);


  const table = useReactTable<T>({
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
    autoResetPageIndex: false,
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
          <div className="flex items-center gap-2">

       {LeftSection}
          {enableRowSelection && selectedCount > 0 && (
            <div className="bg-primary-background hover:bg-primary-background/90 ml-2 flex items-center gap-2 rounded-full px-4 py-2.5 text-sm text-white">
             
              <button
                onClick={() => setRowSelection({
                  
                })}
                className="text- "
              >
                Clear Selection
              </button>
            </div>
          )}
          </div>
        </div>
      </div>

      {/* 🔹 TABLE */}
      <div className="flex-1 overflow-auto">
        <table className="w-full ">
          <thead className="sticky top-0 bg-white py-30  ">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                   onClick={
  header.column.getCanSort()
    ? header.column.getToggleSortingHandler()
    : undefined
}
className={`px-6 py-3 text-left text-xs font-semibold text-foreground uppercase text-nowrap ${
  header.column.getCanSort() ? "cursor-pointer" : ""
}`}
                  >
                    {header.isPlaceholder
                      ? null
                      : (<div className="flex items-center gap-2">
  {flexRender(
    header.column.columnDef.header,
    header.getContext(),
  )}

  {{
    asc: "↑",
    desc: "↓",
  }[header.column.getIsSorted() as string] ?? null}
</div>)}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <TableBody table={table} columnCount={finalColumns.length} onRowClick={onRowClick} />
        </table>
      </div>

      {/* 🔹 PAGINATION */}
      <div className="bg-primary-background/10 text-foreground px-6 py-4">
        <TablePagination table={table} totalRows={totalRows} />
      </div>
    </div>
  );
}
