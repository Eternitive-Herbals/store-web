import { useState, useEffect } from "react";
import { getAllTransactions } from "@/lib/transactionAction";

export function useTransactions(refreshKey: number) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);
        const data = await getAllTransactions();
        setTransactions(data || []);
      } catch (error) {
        console.error("Failed to fetch transactions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [refreshKey]);

  return { transactions, loading };
}
