"use server"
import { ArrowRight, IndianRupee } from "lucide-react";
import Image from "next/image"
import { describe } from "node:test";
type prod = {
    image: string;
    title: string;
    discription: string;
    price: string;

}
const PostCard = async ({products}:{products:prod[]}) => {
  return (<>
    {products.map((product,idx)=>(
    <div key={idx} className={`flex ${idx%2 !== 0 ? "flex-row-reverse":"flex-row"} items-start  justify-between gap-8 bg-prodcard-background rounded-2xl overflow-hidden relative`}>
        <div className=" w-full">
            <Image 
            alt="prod"
            src={product.image}
            width={480}
            height={100}


            />
          
        </div>
        <div className="w-full pl-6 pt-20  flex flex-col justify-start items-between">
            <h1 className="text-2xl font-normal">{product.title}</h1>
            <p className="w-3xs  text-wrap">{product.discription}</p>
            <span className="text-xl font-normal flex items-center text-dark-textfont"><IndianRupee size={20}/>{product.price}</span>

        </div>
         <button className={`w-fit bg-black/80 flex items-center justify-center absolute  bottom-6 gap-3 rounded-full pl-5 pr-2 py-2 text-nav-foreground text-sm 
        ${idx%2 !== 0 ? "left-6":"right-6"}
        `}>View Products <span className="p-1 bg-zinc-400 rounded-full">
            <ArrowRight className="-rotate-45" size={16} /></span></button>
      
         
        

    </div>))}
    </>
  )
}

export default PostCard