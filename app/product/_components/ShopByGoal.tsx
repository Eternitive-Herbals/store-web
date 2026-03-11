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
  image: any;
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
    <div className="">
      <div className="flex w-full flex-col items-center gap-10 bg-[#F4F4F4] pt-12 pb-12">
        <h2 className="font-comfortaa text-2xl font-semibold">
          Shop by Goal
        </h2>

        <div className="flex flex-wrap justify-center gap-9 px-12 w-full">
          {goals.map((goal, idx) => (
            <div key={idx} className="flex flex-col items-center gap-3">
              <div className="relative h-37 w-37 overflow-hidden rounded-full">
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
      <div className=" bg-[#1B1B1B] py-3 px-16 flex w-full gap-6 justify-around items-center ">
        <select className="flex-1 rounded-md border bg-white px-4 py-2 text-gray-600">
          <option>Supplement Type</option>
        </select>

        <select className="flex-1 rounded-md border bg-white px-4 py-2 text-gray-600">
          <option>Price</option>
        </select>

        <div className="flex-1 relative">
        <input
          type="text"
          placeholder="search"
          className="w-full rounded-md border bg-white px-4 py-2 pr-10"
        />

        <Search
          size={18}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
        />
      </div>
      </div>
    </div>
  );
}