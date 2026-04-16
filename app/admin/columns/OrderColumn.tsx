// columns/OrderColumn.ts
import { ColumnDef } from "@tanstack/react-table";
import { OrderType } from "@/types/OrderType";

export const orderColumns: ColumnDef<OrderType>[] = [
  {
    accessorKey: "order_id",
    header: "Order ID",
    enableSorting: true,
  },
  {
    accessorKey: "customer_id",
    header: "Customer ID",
    enableSorting: true,
  },
  {
    accessorKey: "product_id",
    header: "Product ID",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
    enableSorting: true,
  },
  {
    accessorKey: "unit_price",
    header: "Unit Price",
    enableSorting: true,
    cell: ({ getValue }) => `₹${getValue<number>().toFixed(2)}`,
  },
  {
    accessorKey: "total_price",
    header: "Total Price",
    enableSorting: true,
    cell: ({ getValue }) => `₹${getValue<number>().toFixed(2)}`,
  },
  {
    accessorKey: "order_date",
    header: "Order Date",
    cell: ({ getValue }) => {
      const date = new Date(getValue<string>());
      return date.toLocaleDateString("en-IN");
    },
  },
  {
    accessorKey: "shipping_address",
    header: "Address",
  },
  {
    accessorKey: "payment_method",
    header: "Payment",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ getValue }) => {
      const status = getValue<string>();

      const colorMap: Record<string, string> = {
        Shipped: "bg-green-100 text-green-700",
        Pending: "bg-yellow-100 text-yellow-700",
        Delivered: "bg-blue-100 text-blue-700",
        Cancelled: "bg-red-100 text-red-700",
      };

      return (
        <span
          className={`rounded px-2 py-1 text-xs font-medium ${
            colorMap[status] ?? "bg-gray-100 text-gray-700"
          }`}
        >
          {status}
        </span>
      );
    },
  },
];
