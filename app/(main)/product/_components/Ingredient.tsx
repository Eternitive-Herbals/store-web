import React from 'react'
import IngredientCard from './IngredientCard'

export default function Ingredient() {
  return (
    <div className=' w-full p-28 flex justify-center items-center bg-ingredient-background'>
        <div className="h-full  w-full flex flex-col items-center justify-between gap-33">
            <h1 className='font-comfortaa font-bold text-4xl text-wrap tracking-normal'>What's in Vital Strong</h1>

            <IngredientCard />
        </div>
    </div>
  )
}
