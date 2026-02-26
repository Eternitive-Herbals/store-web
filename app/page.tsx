
import HomeCorousal from "./_components/HomeCorousal";

import OurProd from "./_components/OurProd";
import Feedback from "./_components/Feedback";
import Usp from "./_components/Usp";


const page = async () => {
  return (
    <div className="">
      <HomeCorousal />
      <OurProd />
      <Usp />
      <Feedback />
      
    </div>
  );
};

export default page;
