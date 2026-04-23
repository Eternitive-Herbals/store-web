import { MapPinHouse } from "lucide-react";
import React from "react";

export default function ShippingAddress() {
  return (
    <div className="mx-auto grid grid-cols-[2fr_1fr] gap-6">
      <div className="flex flex-col items-center justify-start gap-6">
        <div className="border-primary-background/20 flex h-60 w-full items-start gap-5 rounded-xl border p-6">
          <MapPinHouse size={72} className="text-primary-background/50" />
          <div className="">
            <div className="mb-8 flex flex-col items-start justify-start gap-2">
              <h1 className="text-primary-background text-xl font-semibold">
                Sarthak Singh
              </h1>
              <p className="text-primary-background/50 text-sm">
                BML Munjal University BML
              </p>
              <p className="text-primary-background/50 text-sm">
                University 67th Milestone National
              </p>
              <p className="text-primary-background/50 text-sm">
                Highway Binola Industrial Area
              </p>
              <p className="text-primary-background/50 text-sm">
                Haryana122413 GURGAON HR India
              </p>
            </div>
            <div className="flex items-center justify-start gap-6">
              <button className="text-primary-background hover:text-primary-background/60 cursor-pointer text-lg underline">
                Edit
              </button>
              <button className="text-primary-background hover:text-primary-background/60 cursor-pointer text-lg underline">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="border-primary-background/20 flex h-60 w-full flex-col items-center justify-between rounded-xl border p-15">
        <MapPinHouse size={72} className="text-primary-background" />
        <h1 className="text-primary-background text-sm underline">
          Add new address
        </h1>
      </div>
    </div>
  );
}
