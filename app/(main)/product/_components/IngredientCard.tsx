import Image from 'next/image'
import FallbackIcon from '@/assets/product/Ellipse 1863.png'

export default function IngredientCard({ ingredients }: { ingredients: any[] }) {
  if (!ingredients || ingredients.length === 0) {
    return (
      <div className="w-full text-center py-10 opacity-50">
        No specific ingredients listed for this product.
      </div>
    );
  }

  return (
    <div className="mb-10 w-full space-y-9">
      <div className="h-[.5px] w-full bg-[#9EA1A7]" />
      
      {/* Group ingredients in rows of 3 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {ingredients.map((ing, idx) => {
           const imageSrc = typeof ing.image === 'string' 
           ? (ing.image.startsWith('http') 
               ? (ing.image.includes('://') ? ing.image : FallbackIcon) 
               : (ing.image.startsWith('/') ? ing.image : `/${ing.image}`)) 
           : (ing.image || FallbackIcon);

           return (
            <div key={ing._id || idx} className="flex items-center gap-5">
              <div className="relative size-22 shrink-0 rounded-full overflow-hidden border border-foreground/5">
                <Image 
                  src={imageSrc} 
                  alt={ing.name} 
                  fill 
                  className="object-cover" 
                />
              </div>
              <div className="">
                <h1 className="font-sf-pro-text pb-1 text-[20px] font-normal tracking-normal">
                  {ing.name}
                </h1>
                <p className="font-sf-pro-text text-sm font-light text-[#9EA1A7] line-clamp-3">
                  {ing.description || "Powerful natural ingredient selected for its purity and effectiveness."}
                </p>
              </div>
            </div>
           );
        })}
      </div>

      <div className="h-[.5px] w-full bg-[#9EA1A7]" />
    </div>
  );
}
