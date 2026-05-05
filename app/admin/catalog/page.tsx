"use client";

import CategorySection from "./components/CategorySection";
import GoalSection from "./components/GoalSection";
import IngredientSection from "./components/IngredientSection";
import { useState } from "react";


export default function CatalogPage() {

  const [openModal, setOpenModal] = useState<string>("");

  return (<>
    <div className="flex flex-col gap-6 p-6 h-full">
      <div className="flex items-center justify-between font-sf-pro-text">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Catalog Management</h1>
          <p className="text-sm text-foreground/80 mt-1">
            Manage your store's categories, goals, and ingredients from here.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
        <CategorySection isOpen={openModal} onClose={setOpenModal} />
        <GoalSection isOpen={openModal} onClose={setOpenModal} /> 
        <IngredientSection isOpen={openModal} onClose={setOpenModal} />
      </div>
    </div>

    </>
  );
}
