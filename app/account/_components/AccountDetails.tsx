import React from "react";

export default function AccountDetails() {
  return (
    <div className="w-full space-y-6 place-self-center">
      <div className="font-sf-pro-text border-primary-background/20 text-primary-background flex w-lg items-center justify-between rounded-lg border bg-[#F9F8F6] p-4 text-xl shadow-2xs">
        <h1 className="font-semibold">Name:</h1>
        <h1 className="font-regular text-[#787878]">John Doe</h1>
      </div>
      <div className="font-sf-pro-text border-primary-background/20 text-primary-background flex w-lg items-center justify-between rounded-lg border bg-[#F9F8F6] p-4 text-xl shadow-2xs">
        <h1 className="font-semibold">Email:</h1>
        <h1 className="font-regular text-[#787878]">john.doe@example.com</h1>
      </div>
    </div>
  );
}
