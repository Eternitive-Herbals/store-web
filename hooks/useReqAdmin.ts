import { useAuth } from "@/context/AuthContext";
import { NextResponse } from "next/server";

export function useReqAdmin() {
  const { user } = useAuth();

  if (!user || user.role !== "Admin") {
    return {
        message:"User is not Authorized as Admin",
        status: 401
    }}
  return;
}