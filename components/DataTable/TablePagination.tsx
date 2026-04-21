import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

export default function TablePagination({ table, totalRows }: any) {
  const { pageIndex, pageSize } = table.getState().pagination;

  return (
    <div className="flex items-center justify-between">
      <div className="text-sm">
        Showing {pageIndex * pageSize + 1} to{" "}
        {Math.min((pageIndex + 1) * pageSize, totalRows)} of {totalRows}
      </div>

      <div className="flex gap-2">
        <button onClick={() => table.firstPage()}>
          <ChevronsLeft size={16} />
        </button>
        <button onClick={() => table.previousPage()}>
          <ChevronLeft size={16} />
        </button>

        <span>
          Page {pageIndex + 1} of {table.getPageCount()}
        </span>

        <button onClick={() => table.nextPage()}>
          <ChevronRight size={16} />
        </button>
        <button onClick={() => table.lastPage()}>
          <ChevronsRight size={16} />
        </button>
      </div>
    </div>
  );
}
