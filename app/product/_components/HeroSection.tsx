import Image from 'next/image'
import ProductBgImage from "@/assets/ProductBgImage.png"
export default function HeroSection() {
  return (
    <div className="h-full w-full flex">
        <div className='w-full'>
            <Image
            src={ProductBgImage}
            alt="product-image"
            className="object-cover">
            </Image>
        </div>
        <div></div>
    </div>
  )
}
