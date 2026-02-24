"use server";
import { Handbag, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import SearchBar from "./SearchBar";

const NavBar = async() => {

 

  const links = [
    { name: "Home", href: "/" },
    { name: "Our Story", href: "#" },
    { name: "Product", href: "#" },
    { name: "Contact", href: "#" },
  ];
  return (
    <nav className="bg-nav-background text-nav-foreground absolute z-10 inset-0 top-8 mx-auto flex h-16 w-full max-w-2xl items-center justify-between px-4 backdrop-blur-2xl sm:max-w-4xl md:max-w-6xl rounded-3xl">
      <div className="flex items-center justify-between text-medium w-full px-2 relative  ">
        <span className="flex items-center justify-start shrink-0 ">
          <Image
            src="/athery_Logo.svg"
            alt="athery logo"
            width={100}
            height={100}
            className="ml-4 "
          />
        </span>

        <span className=" absolute flex justify-between items-center font-light gap-2  left-1/2 -translate-x-1/2 ">
          {links.map((link,idx) => (
            <div className="flex items-center justify-center"
            key={idx}>
              <Link
                
                href={link.href}
                className="px-4 py-2 "
              >
                {link.name}
              </Link>
            </div>
          ))}

        </span>

        <span className="flex justify-between items-center  gap-3 ">
          
          
           <SearchBar />
          <Handbag size={20}/>
          <User size={20}/>
         

        </span>
      </div>
    </nav>
  );
};

export default NavBar;
