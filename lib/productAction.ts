export async function createProduct(productData: any) {
  const res = await fetch("/api/products", {
    method: "POST",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(productData),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || errorData.error || "Failed to create product");
  }

  const result = await res.json();
  return result.product;
}

export const updateProduct = async (id: string, productData: any) => {
  const res = await fetch(`/api/products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(productData),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.message || data?.error || "Failed to update product");
  }

  return data.product;
};
export const deleteProduct = async (id: string) => {
  const res = await fetch(`/api/products/${id}`, {
    method: "DELETE",
  });

  const data = await res.json(); // 👈 log this

  console.log("DELETE RESPONSE:", data);

  if (!res.ok) {
    throw new Error(data?.error || "Failed to delete product");
  }

  return data;
};

export const getProductById = async (id: string) => {
  const res = await fetch(`/api/products/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }

  const data = await res.json();
  return data.product;
};
