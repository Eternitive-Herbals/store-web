import ProductGrid from "./ProductGrid";
import Product1 from "@/assets/product1.svg";
import Image from "next/image";
import Spiral from "@/assets/product_spiral.svg";
const products = [
  {
    image: Product1.src,
    title: "Supplement Name",
    discription: "Enhance the bone density and Health",
    price: "1000",
  },
  {
    image: Product1.src,
    title: "Supplement Name",
    discription: "Enhance the bone density and Health",
    price: "1000",
  },
  {
    image: Product1.src,
    title: "Supplement Name",
    discription: "Enhance the bone density and Health",
    price: "1000",
  },
  {
    image: Product1.src,
    title: "Supplement Name",
    discription: "Enhance the bone density and Health",
    price: "1000",
  },
  {
    image: Product1.src,
    title: "Supplement Name",
    discription: "Enhance the bone density and Health",
    price: "1000",
  },
  {
    image: Product1.src,
    title: "Supplement Name",
    discription: "Enhance the bone density and Health",
    price: "1000",
  },
  {
    image: Product1.src,
    title: "Supplement Name",
    discription: "Enhance the bone density and Health",
    price: "1000",
  },
  {
    image: Product1.src,
    title: "Supplement Name",
    discription: "Enhance the bone density and Health",
    price: "1000",
  },
  {
    image: Product1.src,
    title: "Supplement Name",
    discription: "Enhance the bone density and Health",
    price: "1000",
  },
  
];

export default async function OurProductsSection() {
  return (
    <section className=" relative block w-full py-24">
      <Image
        src={Spiral}
        alt="spiral background"
        fill
        priority
        className="fixed inset-0 -z-10 object-cover"
 />
        <ProductGrid products={products} />
   
    </section>
  );
}