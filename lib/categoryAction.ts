export async function createCategory(categoryName: string) {
  const res = await fetch("/api/category", {
    method: "POST",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: categoryName,
    }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || errorData.error || "Failed to create category");
  }

  const categories = await res.json();
  return categories;
}

export async function getAllCategories(){
    const res = await fetch("/api/category")
    const categories = await res.json()
    return categories;
}

export async function deleteCategory(id:string){
    const res = await fetch("/api/category",{
        method:"DELETE",
        body:JSON.stringify({
            id:id
        })
    })
    const categories = await res.json()
    return categories;
}