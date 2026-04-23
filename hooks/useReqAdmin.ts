import { useAuth } from "@/context/AuthContext";

 export  function  useReqAdmin()  {
  const { user } = useAuth();

  if (!user || !user.role || !user.role.includes("admin")) {
    return {
      status: 401,
      message: "Unauthorized: Admin access required",
    };
  }

  return;
};
