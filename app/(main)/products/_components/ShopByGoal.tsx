import { Search } from "lucide-react";
import Image from "next/image";
import EnergyImg from "@/assets/energy.svg";
import SleepImg from "@/assets/sleep.svg";
import FocusImg from "@/assets/focus.svg";
import GutImg from "@/assets/gut.svg";
import BoneImg from "@/assets/bone.svg";
import SkinImg from "@/assets/skin.svg";
import HairImg from "@/assets/hair.svg";

type goal = {
  title: string;
  image: string;
};

export default function ShopByGoal() {
  const goals: goal[] = [
    { title: "Energy & Immunity", image: EnergyImg },
    { title: "Sleep & Recovery", image: SleepImg },
    { title: "Focus & Mental Clarity", image: FocusImg },
    { title: "Gut Health", image: GutImg },
    { title: "Bone & Joint Support", image: BoneImg },
    { title: "Skin & Hair", image: SkinImg },
    { title: "Hair Health", image: HairImg },
  ];

  return (
    <div className=" bg-transparent">
      <div className="flex w-full flex-col items-start gap-10 overflow-x-auto backdrop:blur-lg bg-shop-background pt-12 pb-12 sm:items-center md:overflow-auto">
        <h2 className="font-comfortaa text-2xl font-semibold">Shop by Goal</h2>

        <div className="flex w-full justify-center gap-9 px-12">
          {goals.map((goal, idx) => (
            <div key={idx} className="flex flex-col items-center gap-3">
              <div className="relative size-24 overflow-hidden rounded-full sm:size-37">
                <Image
                  src={goal.image}
                  alt={goal.title}
                  fill
                  className="object-cover"
                />
              </div>

              <p className="w-28 text-center text-sm">{goal.title}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex w-full items-center justify-around gap-2 sm:gap-6 bg-[#1B1B1B]  px-2 sm:px-16 py-3">
        <select className="flex-1 overflow-hidden min-w-10 rounded-md border bg-white px-4 py-2 text-gray-600">
          <option>Supplement Type</option>
        </select>

        <select className="flex-1 overflow-hidden min-w-10  rounded-md border bg-white px-4 py-2 text-gray-600">
          <option>Price</option>
        </select>

        <div className="relative flex-1 min-w-10  overflow-hidden">
          <input
            type="text"
            placeholder="search"
            className="w-full rounded-md border bg-white px-4 py-2 pr-10"
          />

          <Search
            size={18}
            className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500"
          />
        </div>
      </div>
    </div>
  );
}