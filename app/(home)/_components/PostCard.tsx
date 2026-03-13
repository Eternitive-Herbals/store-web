"use server";
import { ArrowUpRight, IndianRupee, Link2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
type prod = {
  image: string;
  title: string;
  discription: string;
  price: string;
};
const PostCard = async ({ products }: { products: prod[] }) => {
  return (
    <>
      <div className="flex flex-col items-center gap-12">
        {products.map((product, idx) => (
          <div
            key={idx}
            className={`flex ${
              idx % 2 !== 0 ? "flex-row-reverse" : "flex-row"
            } bg-prodcard-background relative h-98 w-255.25 items-start justify-between overflow-hidden rounded-4xl`}
          >
            <div className="relative h-full w-107.25 shrink-0">
              <Image
                alt="prod"
                src={product.image}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex w-full flex-col justify-start pt-20 pl-6 font-sf-pro-text">
              <h1 className="text-2xl font-normal">{product.title}</h1>
              <p className="w-3xs">{product.discription}</p>

              <span className="flex items-center text-xl font-normal">
                <IndianRupee size={20} />
                {product.price}
              </span>
            </div>
            <Link href={"/product"}
              className={`tracking-tight text-white font-sf-pro-text cursor-pointer absolute bottom-6 flex h-15 w-61.25 text-2xl items-center justify-center gap-3
                rounded-full bg-[#1B1B1B] py-2 pr-2 pl-5 hover:scale-105 duration-300 ${idx % 2 !== 0 ? "left-6" : "right-6"} `}
            >
              View Products
              <span className="rounded-full bg-[#D9D9D9]/40 p-2">
                <ArrowUpRight size={30} />
              </span>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default PostCard;
