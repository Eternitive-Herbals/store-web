export async function createGoal(goalName: string, imageUrl?: string) {
  const res = await fetch("/api/goal", {
    method: "POST",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: goalName,
      image: imageUrl,
    }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || errorData.error || "Failed to create goal");
  }

  const goals = await res.json();
  return goals;
}

export async function getAllGoals() {
  const res = await fetch("/api/goal");
  const goals = await res.json();
  return goals;
}

export async function deleteGoal(id: string) {
  const res = await fetch(`/api/goal/${id}`, {
    method: "DELETE"
  });
  
  if (!res.ok) {
    throw new Error("Failed to delete goal");
  }

  const goals = await res.json();
  return goals;
}

export async function updateGoal(id: string, name: string, imageUrl?: string) {
  const res = await fetch(`/api/goal/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, image: imageUrl }),
  });
  if (!res.ok) throw new Error("Failed to update goal");
  return res.json();
}
