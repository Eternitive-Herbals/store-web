"use client";

import { useState } from "react";
import { useTransactions } from "./hooks/useTransactions";
import TransactionTableSection from "./components/TransactionTableSection";

export default function TransactionsPage() {
  const [refreshKey] = useState(0);
  const { transactions, loading } = useTransactions(refreshKey);

  return (
    <>

      <TransactionTableSection 
        transactions={transactions} 
        loading={loading} 

       
      />
    </>
  );
}
