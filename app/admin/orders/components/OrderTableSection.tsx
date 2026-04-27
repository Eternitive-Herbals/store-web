"use client";

import EnhancedTable from "@/components/DataTable/EnhancedTable";
import DropdownGeneric from "@/components/DropdownGeneric";
import { OrderType } from "@/types/OrderType";
import { orderColumns } from "../../columns/OrderColumn";
import { orderActionColumn } from "../columns/orderActionColumn";

type Props = {
  orders: OrderType[]; 
  filters: any;
  setFilters: any;
  onRowAction: (action: string, row: OrderType) => void;
  onRowClick: (row: OrderType) => void;
};

export default function OrderTableSection({
  orders,
  filters,
  setFilters,
  onRowAction,
  onRowClick,
}: Props) {
  return (
    <EnhancedTable<OrderType>
      data={orders}
      columns={[...orderColumns, orderActionColumn(onRowAction)]}
      title="Orders"
      description="Manage all customer orders here"
      enableRowSelection
      enableActions={false}
      onRowAction={onRowAction}
      pageSize={20}
      onRowClick={onRowClick}
      LeftSection={
        <div className="flex items-center gap-4">
          <DropdownGeneric
            options={["pending", "paid", "failed"]}
            value={filters.status || undefined}
            placeholder="Status: All"
            allOptionsLabel="All Statuses"
            onChange={(selected) => setFilters((p: any) => ({ ...p, status: selected }))}
          />
        </div>
      }
    />
  );
}
