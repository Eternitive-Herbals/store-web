import FeedbackSection from "./_components/FeedbackSection";
import HomeCorousalSection from "./_components/HomeCorousalSection";
import OurProductsSection from "./_components/OurProductsSection";
import USPSection from "./_components/USPSection";
import BlogSection from "./_components/BlogSection";

export default function Home() {
  return (
    <>
      <HomeCorousalSection />
      <OurProductsSection />
      <USPSection />
      <FeedbackSection />
      <BlogSection />
    </>
  );
}
