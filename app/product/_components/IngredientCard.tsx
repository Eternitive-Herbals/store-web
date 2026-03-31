import Image from 'next/image'
import Elipse from '@/assets/product/Ellipse 1863.png'

export default function IngredientCard() {
  return (
    <div className="mb-10 w-full space-y-9">
      <div className="h-[.5px] w-full bg-[#9EA1A7]" />
      <div className="mx-auto flex items-center justify-between">
        <div className="flex items-center justify-between gap-5">
          <div className="relative size-22 rounded-full">
            <Image src={Elipse} alt="elipse" fill className="object-center" />
          </div>
          <div className="">
            <h1 className="font-sf-pro-text pb-1 text-[20px] font-normal tracking-normal text-wrap">
              Ashwagandha & Brahmi
            </h1>
            <p className="font-sf-pro-text spacing- w-3xs text-sm font-light text-wrap">
              To lower cortisol and clear mental fog, so you feel sharp, not
              stressed.
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between gap-5">
          <div className="relative size-22 rounded-full">
            <Image src={Elipse} alt="elipse" fill className="object-center" />
          </div>
          <div className="">
            <h1 className="font-sf-pro-text pb-1 text-[20px] font-normal tracking-normal text-wrap">
              Ashwagandha & Brahmi
            </h1>
            <p className="font-sf-pro-text spacing- w-3xs text-sm font-light text-wrap">
              To lower cortisol and clear mental fog, so you feel sharp, not
              stressed.
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between gap-5">
          <div className="relative size-22 rounded-full">
            <Image src={Elipse} alt="elipse" fill className="object-center" />
          </div>
          <div className="">
            <h1 className="font-sf-pro-text pb-1 text-[20px] font-normal tracking-normal text-wrap">
              Ashwagandha & Brahmi
            </h1>
            <p className="font-sf-pro-text spacing- w-3xs text-sm font-light text-wrap">
              To lower cortisol and clear mental fog, so you feel sharp, not
              stressed.
            </p>
          </div>
        </div>
      </div>
      <div className="h-[.5px] w-full bg-[#9EA1A7]" />
      <div className="mx-auto flex items-center justify-between">
        <div className="flex items-center justify-between gap-5">
          <div className="relative size-22 rounded-full">
            <Image src={Elipse} alt="elipse" fill className="object-center" />
          </div>
          <div className="">
            <h1 className="font-sf-pro-text pb-1 text-[20px] font-normal tracking-normal text-wrap">
              Ashwagandha & Brahmi
            </h1>
            <p className="font-sf-pro-text spacing- w-3xs text-sm font-light text-wrap">
              To lower cortisol and clear mental fog, so you feel sharp, not
              stressed.
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between gap-5">
          <div className="relative size-22 rounded-full">
            <Image src={Elipse} alt="elipse" fill className="object-center" />
          </div>
          <div className="">
            <h1 className="font-sf-pro-text pb-1 text-[20px] font-normal tracking-normal text-wrap">
              Ashwagandha & Brahmi
            </h1>
            <p className="font-sf-pro-text spacing- w-3xs text-sm font-light text-wrap">
              To lower cortisol and clear mental fog, so you feel sharp, not
              stressed.
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between gap-5">
          <div className="relative size-22 rounded-full">
            <Image src={Elipse} alt="elipse" fill className="object-center" />
          </div>
          <div className="">
            <h1 className="font-sf-pro-text pb-1 text-[20px] font-normal tracking-normal text-wrap">
              Ashwagandha & Brahmi
            </h1>
            <p className="font-sf-pro-text spacing- w-3xs text-sm font-light text-wrap">
              To lower cortisol and clear mental fog, so you feel sharp, not
              stressed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
