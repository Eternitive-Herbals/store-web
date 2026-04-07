"use client"
import { Locate, LogOut, MapPinHouse, ShoppingBag, User } from 'lucide-react';
import React, { useState } from 'react'
import AccountDetails from './_components/AccountDetails';
import OrderHistory from './_components/OrderHistory';
import ShippingAddress from './_components/ShippingAddress';

export default function page() {

  const [options, setOptions] = useState<string>("Account Details")
    type Options = {name: string, icons: {icon: React.ReactNode}}
    const option:Options[] = [
      { name: "Order History",icons: { icon: <ShoppingBag /> } },
      { name: "Shipping Address",icons: { icon: <MapPinHouse /> } },
      { name: "Account Details",icons: { icon: <User /> } },
      { name: "Log Out",icons: { icon: <LogOut /> } },
    ];
  return (
    <div className="p-42">
      <div className="border-primary-background/20 min-h-141 h-fit w-312 place-self-center rounded-4xl border bg-white p-18">
        <div className="flex items-start gap-37">
          <div className="flex items-start justify-between gap-19">
            <div className="py-4">
              {option.map((a, idx) => (
                <h1
                  key={idx}
                  className="font-sf-pro-text font-regular flex items-center gap-3 pb-6 text-xl w-full text-nowrap cursor-pointer hover:text-primary-background/60 transition-colors duration-400 ease-in-out"
                  onClick={() => setOptions(a.name)}
                >
                  {a.icons.icon} {a.name}
                </h1>
              ))}
            </div>
            <div className="h-64 w-0.5 bg-primary-background/20" />
           
          </div>
          <div className=" w-full bg-red ">

{options === "Account Details" && <AccountDetails />}
{options === "Order History" && <OrderHistory />}
{options === "Shipping Address" && <ShippingAddress />}
{options === "Log Out" && <h1>Log Out</h1>}
            
          </div>
        </div>
      </div>
    </div>
  );
}
