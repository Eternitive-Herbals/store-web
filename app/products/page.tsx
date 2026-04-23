import HeroSection from "./_components/HeroSection";
import ProductsSection from "./_components/ProductsSection";
import ShopByGoal from "./_components/ShopByGoal";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Products" };

export default function Products() {
  return (
    <>
      <HeroSection />
      {/* <ShopByGoal /> */}
      <ProductsSection />
    </>
  );
}
