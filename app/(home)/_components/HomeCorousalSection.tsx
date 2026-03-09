import Slider from "./Slider";
import Corosal from "@/assets/Corosal.png";
const slides = [
  { name: "img1", href: Corosal.src },
  { name: "img2", href: Corosal.src },
  { name: "img3", href: Corosal.src },
  { name: "img4", href: Corosal.src },
];

export default function HomeCorousalSection() {
  return (
    <div className="">
      <Slider slides={slides} />
    </div>
  );
}
