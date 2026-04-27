import { flexRender, Table } from "@tanstack/react-table";

export default function TableBody<T>({
  table,
  columnCount,
  onRowClick,
}: {
  table: Table<T>;
  columnCount: number;
  onRowClick?: (row: T) => void;
}) {
  const rows = table.getRowModel().rows;
  

  if (rows.length === 0) {
    return (
      <tbody>
        <tr>
          <td colSpan={columnCount} className="py-10 text-center text-gray-500">
            No data found
          </td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody className="">
      {rows.map((row, index) => (
        <tr key={row.id}  onClick={()=>onRowClick?.(row.original)} className={`hover:bg-primary-background/20  transition-colors duration-400 ease-in-out text-foreground font-sf-pro-text font-medium ${row.getIsSelected() ? "bg-primary-background/20" : ""} ${index % 2 === 0 ? "bg-primary-background/5" : ""}`}>
          {row.getVisibleCells().map((cell) => (
            <td key={cell.id} className="px-6 py-4 text-sm cursor-pointer" >
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}
