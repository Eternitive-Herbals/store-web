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
  const res = await fetch("/api/goal", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });
  
  if (!res.ok) {
    throw new Error("Failed to delete goal");
  }

  const goals = await res.json();
  return goals;
}
