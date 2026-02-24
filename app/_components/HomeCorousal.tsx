
"use server"

import Slider from "./Slider"


const slides = [
   
    { name: "img1", href: "/Corosal.png" },
    { name: "img2", href: "/Corosal.png" },
    { name: "img3", href: "/Corosal.png" },
    { name: "img4", href: "/Corosal.png" },
  
]


const HomeCorousal = async() => {


  return (
 

 <div className="">
  <Slider slides={slides}/>
 </div>


    
  )
}

export default HomeCorousal