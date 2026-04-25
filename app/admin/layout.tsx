"use client"

import Link from "next/link";
import Image from "next/image";
import Logo from "@/assets/brand-logo-white.svg";   
import { Album, LogOut, Package, PanelLeft, ReceiptIcon, } from "lucide-react";
import '@/app/globals.css'
import { useAuth } from "@/context/AuthContext";
export default function AdminLayout({
  children,
}: {    children: React.ReactNode }) {

type LinkType = {
  name: string;
  href: string;
  icon: { icon: React.ReactNode };
};

const {user} = useAuth();

const Avatar = user?.username.charAt(0).toUpperCase() || "U";


  const links : LinkType[]= [
    { name: "Products", href: "/admin/products",icon:{icon:<Album size={24} /> } },
    { name: "Orders", href: "/admin/orders" , icon:{icon:<Package size={24} /> } },
    { name: "Transactions", href: "/admin/transactions" , icon:{icon:<ReceiptIcon size={24} /> }    },
    { name: "LogOut", href: "/admin/logout"   , icon:{icon:<LogOut size={24} /> }  },
  ];
  return (
    <div className="bg-background text-foreground flex h-dvh items-start justify-between gap-6 p-8">
      <div className="flex h-full w-fit min-w-80 flex-col items-center justify-between gap-6 rounded-4xl bg-white p-4 shadow-[0px_0px_10px_rgba(27,27,27,0.05)]">
        <div className="flex w-full flex-col items-start justify-start gap-3">
          <div className="border-primary-background/20 text-primary-background font-sf-pro-text flex w-full  items-center justify-between gap-8 border-b pb-3">
            <Link className="flex items-center gap-4" href={"/"}>
              <Image
                src={Logo}
                alt="athery logo"
                className="size-10 bg-yellow-400"
              />
              <span className="font-comfortaa text-[32px] font-medium">
                aethery
              </span>
            </Link>

            <PanelLeft
              className="text-primary-background cursor-pointer"
              size={28}
            />
          </div>
          {links.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className="flex w-full items-center gap-4 rounded-xl p-2 transition-all duration-500 hover:bg-[#E2DED3] active:bg-[#E2DED3]"
            >
              {link.icon.icon}
              <span className="text-xl font-normal">{link.name}</span>
            </Link>
          ))}
        </div>
        <div className="flex w-full items-center justify-start gap-2 text-2xl">
          <div className="size-8 rounded-full bg-red-300 flex items-center justify-center object-cover text-white font-bold">{Avatar}</div>
          <p className="font-medium">{user?.username}</p>
        </div>
      </div>
      <div className="mx-auto my-auto h-full w-full flex items-start justify-center overflow-hidden">{children}</div>
    </div>
  );
}