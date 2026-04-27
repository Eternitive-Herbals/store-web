export async function getAllIngredients() {
  const res = await fetch("/api/ingredients");
  
  if (!res.ok) {
    throw new Error("Failed to fetch ingredients");
  }

  const ingredients = await res.json();
  return ingredients;
}

export async function createIngredient(name: string, description: string, image: string) {
  const res = await fetch("/api/ingredients", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, description, image }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || errorData.error || "Failed to create ingredient");
  }

  return res.json();
}

export async function deleteIngredient(id: string) {
    const res = await fetch(`/api/ingredients/${id}`, {
        method: "DELETE"
    });
    
    if (!res.ok) {
        throw new Error("Failed to delete ingredient");
    }

    const ingredients = await res.json();
    return ingredients;
}

export async function updateIngredient(id: string, name: string, description: string, imageUrl?: string) {
    const res = await fetch(`/api/ingredients/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description, image: imageUrl }),
    });
    if (!res.ok) throw new Error("Failed to update ingredient");
    return res.json();
}
