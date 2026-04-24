import { IUser } from "@/models/User";
import React from "react";
type AccountDetailsProps = {
  user: IUser | null;
  refreshUser: () => Promise<void>;
};
export default function AccountDetails({ user, refreshUser }: AccountDetailsProps) {
  return (
    <div className="w-full space-y-6 place-self-center">
      <div className="font-sf-pro-text border-primary-background/20 text-primary-background flex w-lg items-center justify-between rounded-lg border bg-[#F9F8F6] p-4 text-xl shadow-2xs">
        <h1 className="font-semibold">Name:</h1>
        <h1 className="font-regular text-[#787878]">{user?.username || "N/A"}</h1>
      </div>
      <div className="font-sf-pro-text border-primary-background/20 text-primary-background flex w-lg items-center justify-between rounded-lg border bg-[#F9F8F6] p-4 text-xl shadow-2xs">
        <h1 className="font-semibold">Email:</h1>
        <h1 className="font-regular text-[#787878]">{user?.email || "N/A"}</h1>
      </div>
    </div>
  );
}
