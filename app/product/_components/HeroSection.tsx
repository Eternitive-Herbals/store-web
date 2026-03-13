import Image from 'next/image'
import ProductBgImage from "@/assets/ProductBgImage.svg"
export default function HeroSection() {
  return (
    <div className="relative h-[540px]">
            <Image
            src={ProductBgImage}
            alt="product-image"
            fill
            className="object-cover">
            </Image>
    </div>
  )
}
