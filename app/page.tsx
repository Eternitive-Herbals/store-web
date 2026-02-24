import React from "react";
import HomeCorousal from "./_components/HomeCorousal";
import Footer from "./_components/Footer";

const page = async () => {
  return (
    <div className="h-screen">
      <HomeCorousal />
      <Footer />
    </div>
  );
};

export default page;
