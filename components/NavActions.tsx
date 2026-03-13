"use client";

import { Search, ShoppingBag, User } from "lucide-react";
import Link from "next/link";

const NavActions = () => {
  return (
    <>
      <Search
        size={20}
        className="cursor-pointer"
        // onClick={() => console.log("User clicked")}
      />
      <Link href={"/cart"}>
        <ShoppingBag
          size={20}
          className="cursor-pointer"
          onClick={() => console.log("Cart clicked")}
        />
      </Link>
      <User
        size={20}
        className="cursor-pointer"
        onClick={() => console.log("User clicked")}
      />
    </>
  );
};

export default NavActions;
