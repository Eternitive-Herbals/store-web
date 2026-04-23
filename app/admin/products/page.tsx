"use client";
import { OrderType } from "@/types/OrderType";
import Mdata from "../../MOCK_DATA.json";
import { useMemo, useState } from "react";
import { orderColumns } from "../columns/OrderColumn";
import EnhancedTable from "@/components/DataTable/EnhancedTable";
import CategoryModal from "@/components/modal";

export default function Page() {
  const [open, setOpen] = useState(false);
  const data: OrderType[] = useMemo(() => Mdata as OrderType[], []);




  const handleRowAction = (action: string, row: any) => {
    console.log(action, row);

    if (action === "view") {

    }

    if (action === "delete") {

    }
  };
    return (
      <>
        <EnhancedTable
          data={data}
          columns={orderColumns}
          title="Orders"
          description="Manage all your orders here"
          enableRowSelection={true}
          enableActions={true}
          onRowAction={handleRowAction}
          pageSize={20}

          LeftSection={
            <button
              onClick={() => setOpen(true)}
              className="mb-4 rounded-full bg-primary-background  px-4 py-2 text-white"
            >
              Create Category
            </button>
          }
        />
          <CategoryModal
            open={open}
            onClose={() => setOpen(false)}
            onCreate={(value) => {
              console.log("New category:", value);
            }}
          />

        </>
    );
}