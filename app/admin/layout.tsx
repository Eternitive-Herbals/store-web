"use client"

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Logo from "@/assets/Aethery_black.svg";   
import { Album, LogOut, Package, ReceiptIcon, ArchiveIcon } from "lucide-react";
import '@/app/globals.css'
import { useAuth } from "@/context/AuthContext";

export default function AdminLayout({
  children,
}: {    children: React.ReactNode }) {

  const pathname = usePathname();
  const { user } = useAuth();

  const Avatar = user?.username?.charAt(0).toUpperCase() || "U";

  type LinkType = {
    name: string;
    href: string;
    icon: React.ReactNode;
  };

  const links: LinkType[] = [
  
    { name: "Products", href: "/admin/products", icon: <Album size={20} /> },
    { name: "Orders", href: "/admin/orders", icon: <Package size={20} /> },
    {name: "Catalog", href:"/admin/catalog", icon: <ArchiveIcon size={20} />},
    { name: "Transactions", href: "/admin/transactions", icon: <ReceiptIcon size={20} /> },
  ];

  return (
    <div className="bg-[#f8f9fa] text-slate-900 flex h-dvh items-start gap-4 p-4 font-sans selection:bg-slate-200">
      {/* Sidebar */}
      <aside className="relative flex h-full w-72 flex-col justify-between rounded-[2rem] bg-white border border-slate-100 p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300">
        <div className="flex flex-col gap-8">
          {/* Header / Logo */}
          <div className="flex items-center justify-between  ">
            <Link className="flex items-center gap-3 group" href={"/"}>
                <Image
                  src={Logo}
                  alt="Aethery logo"
                  className="size-6 object-contain opacity-90 transition-opacity group-hover:opacity-100"
                />
              <span className="font-comfortaa text-2xl font-bold tracking-tight text-slate-800">
                aethery
              </span>
            </Link>
            {/* <button className="rounded-lg p-2 text-primary-background/60">
              <PanelLeft size={22} strokeWidth={2} />
            </button> */}
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-2">
           
            {links.map((link, index) => {
              const isActive = pathname === link.href || (link.href !== "/admin" && pathname?.startsWith(link.href));
              return (
                <Link
                  key={index}
                  href={link.href}
                  className={`group flex items-center gap-3.5 rounded-xl px-4 py-2.5 text-[15px] font-medium transition-all duration-300 ease-out ${
                    isActive
                      ? "bg-primary-background text-white shadow-xs shadow-primary-background/20"
                      : "text-primary-background/50 hover:bg-primary-background/10 hover:text-primary-background"
                  }`}
                > 
                  <div className={`transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
                    {link.icon}
                  </div>  
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section (User & Logout) */}
        <div className="flex flex-col gap-3">
          <Link
            href="/admin/logout"
            className="group flex w-full items-center gap-3.5 rounded-2xl px-4 py-3.5 text-[15px] font-medium text-slate-500 transition-all hover:bg-red-50 hover:text-red-600"
          >
            <div className="transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-12">
              <LogOut size={20} />
            </div>
            Log Out
          </Link>
          
          <div className="flex items-center gap-3 rounded-2xl bg-primary-background/5 hover:bg-primary-background/10 p-3 transition-colors duration-300 shadow-2xs transition-all cursor-pointer">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary-background to-purple-500 text-sm font-bold text-white shadow-inner">
              {Avatar}
            </div> 
            <div className="flex flex-col overflow-hidden">
              <span className="truncate text-sm font-semibold text-primary-background">
                {user?.username || "Admin User"}
              </span>
              <span className="truncate text-xs text-slate-500 hover:text-primary-background transition-colors duration-300">
                {user?.email || "admin@aethery.com"}
              </span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex h-full flex-1  overflow-hidden rounded-4xl bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all">
        <div className="h-full w-full p-8">
          {children}
        </div>
      </div>
    </div>
  );
}