"use client";

import EnhancedTable from "@/components/DataTable/EnhancedTable";
import { transactionColumns } from "../../columns/TransactionColumn";
import { Search } from "lucide-react";
import { useState, useMemo } from "react";
import DropdownGeneric from "@/components/DropdownGeneric";

type Props = {
  transactions: any[];
  loading: boolean;
 
};

export default function TransactionTableSection({ transactions, loading}: Props) {
 
  const [methodFilter, setMethodFilter] = useState("");

  const filteredTransactions = useMemo(() => {
    return transactions.filter((t) => {
      
      const method = t.paymentMethod || "";
      
     
      const matchesMethod = !methodFilter || method === methodFilter;

      return matchesMethod;
    });
  }, [transactions, methodFilter]);

  return (
    <EnhancedTable
      data={filteredTransactions}
      columns={transactionColumns}
      title="Financial Transactions"
      description="Monitor and audit all incoming payments and settlements"
      pageSize={15}
      enableRowSelection
      enableActions={false}
      LeftSection={
        <div className="flex items-center gap-4">
          
          
          <DropdownGeneric
            options={["card", "upi", "netbanking", "cod"]}
            value={methodFilter || undefined}
            placeholder="Method: All"
            allOptionsLabel="All Methods"
            onChange={(val) => setMethodFilter(val)}
          />
        </div>
      }
    />
  );
}
