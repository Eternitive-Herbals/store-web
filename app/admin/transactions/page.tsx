"use client";

import { useState } from "react";
import { useTransactions } from "./hooks/useTransactions";
import TransactionTableSection from "./components/TransactionTableSection";

export default function TransactionsPage() {
  const [refreshKey] = useState(0);
  const { transactions, loading } = useTransactions(refreshKey);

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-700 h-full">
      <div className="flex flex-col gap-1 px-4 py-2">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight font-sf-pro-text">
          Transactions
        </h1>
        <p className="text-slate-500 text-sm font-medium">
          Manage and audit all financial activities across your store.
        </p>
      </div>

      <TransactionTableSection 
        transactions={transactions} 
        loading={loading} 
        
       
      />
    </div>
  );
}
