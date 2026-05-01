"use client";

import { LogOut, MapPinHouse, ShoppingBag, User } from "lucide-react";
import React, { useState } from "react";
import AccountDetails from "./components/AccountDetails";
import OrderHistory from "./components/OrderHistory";
import ShippingAddress from "./components/ShippingAddress";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/lib/userAction";
import { toast } from "sonner";


type OptionType =
  | "Order History"
  | "Shipping Address"
  | "Account Details"
  | "Log Out";

type Option = {
  name: OptionType;
  icon: React.ReactNode;
};

export default function Page() {
    const router = useRouter();
  const [selectedOption, setSelectedOption] =
    useState<OptionType>("Account Details");
  
    const {loading, refreshUser, user} = useAuth();

     if (loading) {
    return <div className="">Loading...</div>;
  }



  const options: Option[] = [
    { name: "Order History", icon: <ShoppingBag /> },
    { name: "Shipping Address", icon: <MapPinHouse /> },
    { name: "Account Details", icon: <User /> },
    { name: "Log Out", icon: <LogOut /> },
  ];


  const handleLogout = async () => {
    try {
      await logoutUser();
      await refreshUser(); 
      toast.success("Logged out successfully");
      router.push("/login");
    } catch (err) {
      console.error("Logout failed", err);
      toast.error("Logout failed");
    }
  };

  return (
    <div className="p-12 pt-42">
      <div className="border-primary-background/20 min-h-141 w-fit max-w-312 place-self-center rounded-4xl border bg-white p-18 md:w-10/11">
        <div className="flex flex-col items-start gap-6 sm:flex-row lg:gap-37">
          {/* Sidebar */}
          <div className="flex items-start justify-between gap-5 lg:gap-19">
            <div className="py-4">
              {options.map((opt) => (
                <h1
                  key={opt.name}
                  onClick={() => (  opt.name === "Log Out" ? handleLogout() : setSelectedOption(opt.name))}
                  className={`flex cursor-pointer items-center gap-3 pb-6 text-sm text-nowrap transition-colors duration-300 md:text-xl ${
                    selectedOption === opt.name
                      ? "text-primary-background font-semibold"
                      : "hover:text-primary-background/60 text-primary-background/40"
                  }`}
                >
                  {opt.icon} {opt.name}
                </h1>
              ))}
            </div>

            <div className="bg-primary-background/20 hidden h-64 w-0.5 md:block" />
          </div>

          {/* Content */}
          <div className="w-full">
            {selectedOption === "Account Details" && <AccountDetails user={user} refreshUser={refreshUser} />}
            {selectedOption === "Order History" && <OrderHistory />}
            {selectedOption === "Shipping Address" && <ShippingAddress user={user} refreshUser={refreshUser} />}
            {selectedOption === "Log Out" && <h1>Log Out</h1>}
          </div>
        </div>
      </div>
    </div>
  );
}
