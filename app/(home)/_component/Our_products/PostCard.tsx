"use server";
import { ArrowRight, IndianRupee } from "lucide-react";
import Image from "next/image";
type prod = {
  image: string;
  title: string;
  discription: string;
  price: string;
};
const PostCard = async ({ products }: { products: prod[] }) => {
  return (
    <>
      {products.map((product, idx) => (
        <div
          key={idx}
          className={`flex ${idx % 2 !== 0 ? "flex-row-reverse" : "flex-row"} bg-prodcard-background relative items-start text-SF_Pro_Text justify-between gap-8 overflow-hidden rounded-2xl`}
        >
          <div className="w-full">
            <Image alt="prod" src={product.image} width={480} height={100} />
          </div>
          <div className="items-between flex w-full flex-col justify-start pt-20 pl-6">
            <h1 className="text-2xl font-normal">{product.title}</h1>
            <p className="w-3xs text-wrap">{product.discription}</p>
            <span className="text-dark-textfont flex items-center text-xl font-normal">
              <IndianRupee size={20} />
              {product.price}
            </span>
          </div>
          <button
            className={`text-nav-foreground absolute bottom-6 flex w-fit items-center justify-center gap-3 rounded-full bg-black/80 py-2 pr-2 pl-5 text-sm ${idx % 2 !== 0 ? "left-6" : "right-6"} `}
          >
            View Products{" "}
            <span className="rounded-full bg-zinc-400 p-1">
              <ArrowRight className="-rotate-45" size={16} />
            </span>
          </button>
        </div>
      ))}
    </>
  );
};

export default PostCard;
