import { ColumnDef } from "@tanstack/react-table";

export const transactionColumns: ColumnDef<any>[] = [
  {
    accessorKey: "id",
    header: "Transaction ID",
    cell: ({ row }) => {
      const id = row.original._id.toString().slice(-8).toUpperCase();
      return <span className="text-xs font-mono font-bold text-slate-500">#{id}</span>;
    },
  },
  {
    accessorKey: "user",
    header: "Customer",
    cell: ({ row }) => {
      const user = row.original.user?.username || row.original.user?.email || "Unknown User";
      return (
        <div className="flex flex-col">
          <span className="font-semibold text-slate-800">{user}</span>
          <span className="text-xs text-slate-400">{row.original.user?.email || ""}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => (
      <div className="font-bold text-slate-800">
        ₹{row.original.amount?.toLocaleString() || "0"}
      </div>
    ),
  },
  {
    accessorKey: "paymentMethod",
    header: "Method",
    cell: ({ row }) => (
      <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-wider">
        {row.original.paymentMethod}
      </span>
    ),
  },
  {
    accessorKey: "order",
    header: "Order Ref",
    cell: ({ row }) => {
      const orderId = row.original.order?.toString().slice(-8).toUpperCase();
      return <span className="text-xs font-medium text-primary-background hover:underline cursor-pointer">ORD-{orderId}</span>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => {
      const date = new Date(row.original.createdAt);
      return (
        <div className="flex flex-col">
          <span className="text-sm font-medium text-slate-600">{date.toLocaleDateString("en-IN")}</span>
          <span className="text-xs text-slate-400">{date.toLocaleTimeString("en-IN", { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
      );
    },
  },
];
