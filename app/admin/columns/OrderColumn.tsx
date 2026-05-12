import { ColumnDef } from "@tanstack/react-table";
import { OrderType } from "@/types/OrderType";


export const orderColumns: ColumnDef<OrderType>[] = [
  {
    accessorKey: "id",
    header: "Order ID",
    cell: ({ row }) => {
      const id = row.original._id.slice(-8);
      return <span className="text-xs font-light text-sf-pro-text text-black hover:underline">{id}</span>;
    },
  },

  {
    accessorKey: "username",
    header: "Customer",
    cell: ({ row }) => {
      const user = row.original.user.username || row.original.user.email;
      
      
      return ( 
        <div>
          <span className="font-medium text-foreground">{user}</span>
        </div>
      );
    },
  },
 
  {
    accessorKey: "totalAmount",
    header: "Total Amount",
    cell: ({ row }) => (
      <div className="font-semibold text-foreground">
        ₹{row.original.totalAmount?.toFixed(2) || "0.00"}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.items?.[0]?.status || "unknown";
      
      let colorClass = "bg-gray-100 text-gray-800";
      if (status === "paid") colorClass = "bg-green-100 text-green-800";
      if (status === "pending") colorClass = "bg-yellow-100 text-yellow-800";
      if (status === "failed") colorClass = "bg-red-100 text-red-800";

      return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${colorClass}`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Order Date",
    cell: ({ row }) => {
      const date = new Date(row.original.createdAt || new Date());
      return <span className="text-sm">{date.toLocaleDateString("en-IN")}</span>;
    },
  },
 
];
