export async function getAllTransactions() {
  try {
    const res = await fetch("/api/transaction", {
      cache: "no-store",
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to fetch transactions");
    }

    return await res.json();
  } catch (error) {
    console.error("Error in getAllTransactions:", error);
    throw error;
  }
}
