
import HomeCorousal from "./_components/HomeCorousal";
import Footer from "./_components/Footer";
import OurProd from "./_components/OurProd";


const page = async () => {
  return (
    <div className="h-screen">
      <HomeCorousal />
      <OurProd />
      <Footer />
    </div>
  );
};

export default page;
