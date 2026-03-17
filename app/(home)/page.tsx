import FeedbackSection from "./_components/FeedbackSection";
import CarouselSection from "./_components/CarouselSection";
import FeaturedProductsSection from "./_components/FeaturedProductsSection";
import USPSection from "./_components/USPSection";
import BlogSection from "./_components/BlogSection";

export default function Home() {
  return (
    <>
      <CarouselSection />
      <FeaturedProductsSection />
      <USPSection />
      <FeedbackSection />
      <BlogSection />
    </>
  );
}
