"use client";

import { useState, useEffect } from "react";
import { getAllIngredients, createIngredient, deleteIngredient, updateIngredient } from "@/lib/ingredientAction";
import { Trash2, Plus, Edit } from "lucide-react";
import Modal from "@/components/genericModal/Modal";
export default function IngredientSection({
  isOpen,
  onClose,
}: { 
  isOpen: string;
  onClose: (val: string) => void;
}) {
  const [ingredients, setIngredients] = useState<any[]>([]);
  const [fetching, setFetching] = useState(true);
  const [selectedIngredient, setSelectedIngredient] = useState<any | null>(null);

  const fetchIngredients = async () => {
    setFetching(true);
    try {
      const data = await getAllIngredients();
      setIngredients(data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchIngredients();
  }, []);

  const handleSubmit = async (name: string, previewUrl?: string, description?: string) => {
    if (!name.trim() || !description?.trim() || !previewUrl) {
      alert("Please enter a name, description, and upload an image.");
      return;
    }
    try {
      if (selectedIngredient) {
        await updateIngredient(selectedIngredient._id, name, description, previewUrl);
      } else {
        await createIngredient(name, description, previewUrl);
      }
      onClose("");
      fetchIngredients();
      setSelectedIngredient(null);
    } catch (error) {
      console.error(error);
      alert(`Failed to ${selectedIngredient ? "update" : "create"} ingredient`);
    }
  };

  const handleEdit = (ingredient: any) => {
    setSelectedIngredient(ingredient);
    onClose("ingredient");
  };



  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this ingredient?")) return;
    try {
      await deleteIngredient(id);
      fetchIngredients();
    } catch (error) {
      console.error(error);
      alert("Failed to delete ingredient");
    }
  };

  return (
    <div className="bg-white rounded-xl bg-background border-2 border-foreground/10 p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-foreground">Ingredients</h2>
        <button
          onClick={() => onClose("ingredient")}
          className="bg-primary-background hover:bg-primary-background/90 ml-2 flex items-center gap-2 rounded-full  px-4 py-2.5 text-sm text-background"
        >
           Ingredient <Plus size={16} />
        </button>
      </div>

      <Modal 
        open={isOpen === "ingredient"}
        onClose={() => {
          onClose("");
          setSelectedIngredient(null);
        }}
        onCreate={handleSubmit}
        title="Ingredient"
        isImageUpload={true}
        hasDescription={true}
        initialData={selectedIngredient ? { 
          name: selectedIngredient.name, 
          image: selectedIngredient.image,
          description: selectedIngredient.description
        } : null}
      />

      {fetching ? (
        <p className="text-sm text-foreground">Loading ingredients...</p>
      ) : ingredients.length === 0 ? (
        <p className="text-sm text-foreground">No ingredients found.</p>
      ) : (
        <div className="h-full overflow-y-auto ">
          {ingredients.map((ing, idx) => (
            <div
              key={ing._id}
              className={`flex items-start gap-4 p-3 ${
                idx % 2 === 0 ? "bg-primary-background/5" : "bg-white"
              }`}
            >
              {ing.image ? (
                <img src={ing.image} alt={ing.name} className="w-12 h-12 rounded-md object-cover mt-1" />
              ) : (
                <div className="w-12 h-12 rounded-md bg-gray-200 flex items-center justify-center text-xs text-gray-400 mt-1">No Img</div>
              )}
              <div className="flex-1 text-foreground">
                <span className="font-medium text-sm block">{ing.name}</span>
                <p className="text-xs line-clamp-2 mt-1">{ing.description}</p>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleEdit(ing)}
                  className="text-slate-400 hover:text-primary-background hover:bg-slate-100 p-2 rounded transition-colors"
                  title="Edit"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => handleDelete(ing._id)}
                  className="text-slate-400 hover:text-red-500 hover:bg-red-50 p-2 rounded transition-colors"
                  title="Delete"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
