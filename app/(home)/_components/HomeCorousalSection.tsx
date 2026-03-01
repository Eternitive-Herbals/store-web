import Slider from "./Slider";

const slides = [
  { name: "img1", href: "/assets/Corosal.png" },
  { name: "img2", href: "/assets/Corosal.png" },
  { name: "img3", href: "/assets/Corosal.png" },
  { name: "img4", href: "/assets/Corosal.png" },
];

export default function HomeCorousalSection() {
  return (
    <div className="">
      <Slider slides={slides} />
    </div>
  );
}
