
import HomeCorousal from "./_components/HomeCorousal";
import Footer from "./_components/Footer";
import OurProd from "./_components/OurProd";
import Feedback from "./_components/Feedback";
import Usp from "./_components/Usp";


const page = async () => {
  return (
    <div className="h-screen">
      <HomeCorousal />
      <OurProd />
      <Usp />
      <Feedback />
      <Footer />
    </div>
  );
};

export default page;
