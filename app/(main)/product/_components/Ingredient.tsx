import React from 'react'
import IngredientCard from './IngredientCard'

type IngredientProps = {
  product: {
    name: string;
    ingredients: Array<{
      _id: string;
      name: string;
      description: string;
      image: string;
    }>;
  };
};

export default function Ingredient({ product }: IngredientProps) {
  return (
    <div className=' w-full p-28 flex justify-center items-center bg-ingredient-background'>
        <div className="h-full  w-full flex flex-col items-center justify-between gap-33">
            <h1 className='font-comfortaa font-bold text-4xl text-wrap tracking-normal'>What&apos;s in {product.name}</h1>

            <IngredientCard ingredients={product.ingredients} />
        </div>
    </div>
  )
}
