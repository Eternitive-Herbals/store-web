"use client";

import { Handbag, User } from "lucide-react";

const NavActions = () => {
  return (
    <>
      <Handbag
        size={20}
        className="cursor-pointer"
        onClick={() => console.log("Cart clicked")}
      />
      <User
        size={20}
        className="cursor-pointer"
        onClick={() => console.log("User clicked")}
      />
    </>
  );
};

export default NavActions;