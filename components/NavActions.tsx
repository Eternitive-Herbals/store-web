"use client";

import { Handbag, User } from "lucide-react";
import Link from "next/link";

const NavActions = () => {
  return (
    <>
      <Link href={"/cart"}>
        <Handbag
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
