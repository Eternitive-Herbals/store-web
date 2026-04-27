export async function getAllIngredients() {
  const res = await fetch("/api/ingredients");
  
  if (!res.ok) {
    throw new Error("Failed to fetch ingredients");
  }

  const ingredients = await res.json();
  return ingredients;
}
