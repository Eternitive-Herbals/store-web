export const updateUserProfile = async (userData: any) => {
  const res = await fetch("/api/auth/me", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.message || data?.error || "Failed to update profile");
  }

  return data.user;
};

export const logoutUser = async () => {
  const res = await fetch("/api/auth/logout", {
    method: "POST",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Logout failed");
  }

  return true;
};
