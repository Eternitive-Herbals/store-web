import { Suspense } from "react";
import HeroSection from "./_components/HeroSection";
import ProductsSection from "./_components/ProductsSection";
import ShopByGoal from "./_components/ShopByGoal";
export default function Products() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#F9F8F6] flex items-center justify-center text-gray-500">
        Loading Products...
      </div>
    }>
      <HeroSection />
      {/* <ShopByGoal /> */}
      <ProductsSection />
    </Suspense>
  );
}
