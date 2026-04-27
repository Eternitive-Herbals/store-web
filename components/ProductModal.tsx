"use client";

import { X } from "lucide-react";
import { useState, useEffect } from "react";
import { useImageUpload } from "./genericModal/useImageUpload";
import ImageUpload from "./genericModal/ImageUpload";
import { getAllCategories } from "@/lib/categoryAction";
import { getAllGoals } from "@/lib/goalAction";
import { getAllIngredients } from "@/lib/ingredientAction";
import { ProductType } from "@/types/ProductType";

export default function ProductModal({
  open,
  onClose,
  onCreate,
  mode = "create",
  initialData = null,
}: {
  open: boolean;
  onClose: () => void;
  onCreate?: (productData: any) => Promise<void>;
  mode?: "create" | "view" | "edit";
  initialData?: ProductType | null;
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [dosage, setDosage] = useState("");
  
  const [categories, setCategories] = useState<any[]>([]);
  const [goals, setGoals] = useState<any[]>([]);
  const [ingredients, setIngredients] = useState<any[]>([]);

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);

  const [loading, setLoading] = useState(false);

  const {
    file,
    setFile,
    previewUrl,
    setPreviewUrl,
    uploading,
    deleting,
    handleUpload,
    handleDelete,
  } = useImageUpload();

  useEffect(() => {
    if (open) {
      if ((mode === "view" || mode === "edit") && initialData) {
        setName(initialData.name);
        setDescription(initialData.description);
        setPrice(initialData.price.toString());
        setDosage(initialData.dosage);
        setPreviewUrl(initialData.image);
        setSelectedCategories(initialData.category.map((c: any) => c._id));
        setSelectedGoals(initialData.goal.map((g: any) => g._id));
        setSelectedIngredients(initialData.ingredients.map((i: any) => i._id));
      } else {
        setName("");
        setDescription("");
        setPrice("");
        setDosage("");
        setPreviewUrl(null);
        setFile(null);
        setSelectedCategories([]);
        setSelectedGoals([]);
        setSelectedIngredients([]);
      }

      Promise.all([
        getAllCategories(),
        getAllGoals(),
        getAllIngredients()
      ]).then(([cats, gls, ings]) => {
        setCategories(cats || []);
        setGoals(gls || []);
        setIngredients(ings || []);
      }).catch(console.error);
    }
  }, [open, mode, initialData]);

  const isView = mode === "view";

  if (!open) return null;

  const handleSubmit = async () => {
    if (!name || !description || !price || !dosage || !previewUrl) {
      alert("Please fill all required fields and upload an image.");
      return;
    }
    if (selectedCategories.length === 0 || selectedGoals.length === 0 || selectedIngredients.length === 0) {
      alert("Please select at least one category, goal, and ingredient.");
      return;
    }

    setLoading(true);
    try {
      if (onCreate) {
        await onCreate({
          name,
          description,
          price: Number(price),
          dosage,
          image: previewUrl,
          category: selectedCategories,
          goal: selectedGoals,
          ingredients: selectedIngredients
        });
      }
      handleClose();
    } catch (error) {
      console.error(error);
      alert("Failed to create product");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setName("");
    setDescription("");
    setPrice("");
    setDosage("");
    setSelectedCategories([]);
    setSelectedGoals([]);
    setSelectedIngredients([]);
    setFile(null);
    setPreviewUrl(null);
    onClose();
  };

  const toggleSelection = (id: string, list: string[], setList: (val: string[]) => void) => {
    if (list.includes(id)) {
      setList(list.filter(item => item !== id));
    } else {
      setList([...list, id]);
    }
  };

  return (
    <div className="text-sf-pro-text fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="bg-foreground/5 absolute inset-0 backdrop-blur-sm"
        onClick={handleClose}
      />

      <div className="relative w-full max-w-4xl max-h-[90vh] rounded-xl bg-white p-6 shadow-xl">
        
         <button
          onClick={handleClose}
          className="bg-foreground/60 absolute top-0 -right-10 rounded-full p-1"
        >
          <X size={18} color="background" />
        </button>

        <h2 className="text-foreground mb-6 text-2xl font-bold">
          {mode === "view" ? "Product Details" : mode === "edit" ? "Edit Product Details" : "Create New Product"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-[calc(100%-80px)] overflow-y-auto pr-2">
          {/* Left Column: Basic Info */}
          <div className="space-y-4">
            <div>
              <label className="text-sm font-semibold text-foreground mb-1 block">Product Name</label>
              <input
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isView}
                className="border-foreground/20 focus:border-foreground/60 w-full rounded-lg border-2 px-3 py-2 text-sm outline-none disabled:bg-gray-50 disabled:text-gray-500"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-foreground mb-1 block">Description</label>
              <textarea
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={isView}
                className="border-foreground/20 focus:border-foreground/60 w-full rounded-lg border-2 px-3 py-2 text-sm outline-none min-h-[100px] disabled:bg-gray-50 disabled:text-gray-500"
              />
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="text-sm font-semibold text-foreground mb-1 block">Price (₹)</label>
                <input
                  type="number"
                  placeholder="0.00"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  disabled={isView}
                  className="border-foreground/20 focus:border-foreground/60 w-full rounded-lg border-2 px-3 py-2 text-sm outline-none disabled:bg-gray-50 disabled:text-gray-500"
                />
              </div>
              <div className="flex-1">
                <label className="text-sm font-semibold text-foreground mb-1 block">Dosage</label>
                <input
                  type="text"
                  placeholder="e.g. 2 scoops"
                  value={dosage}
                  onChange={(e) => setDosage(e.target.value)}
                  disabled={isView}
                  className="border-foreground/20 focus:border-foreground/60 w-full rounded-lg border-2 px-3 py-2 text-sm outline-none disabled:bg-gray-50 disabled:text-gray-500"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-semibold text-foreground mb-2 block">Product Image</label>
              {isView ? (
                previewUrl ? (
                  <div className="relative w-32 h-32 rounded-xl overflow-hidden border-2 border-foreground/20">
                    <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="w-32 h-32 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400 text-sm border-2 border-foreground/20">No Image</div>
                )
              ) : (
                <ImageUpload
                  file={file}
                  setFile={setFile}
                  previewUrl={previewUrl}
                  uploading={uploading}
                  deleting={deleting}
                  onUpload={handleUpload}
                  onDelete={handleDelete}
                />
              )}
            </div>
          </div>

          {/* Right Column: Relationships */}
          <div className="space-y-6">
            <div>
              <label className="text-sm font-semibold text-foreground mb-2 block">Categories</label>
              <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto p-2 border-2 border-foreground/10 rounded-lg">
                {categories.map((cat) => (
                  <label key={cat._id} className="flex items-center gap-2 text-sm cursor-pointer hover:bg-gray-50 px-2 py-1 rounded">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(cat._id)}
                      onChange={() => toggleSelection(cat._id, selectedCategories, setSelectedCategories)}
                      disabled={isView}
                      className="rounded border-gray-300 disabled:opacity-50"
                    />
                    <span className={isView ? "text-gray-500" : ""}>{cat.name}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-foreground mb-2 block">Goals</label>
              <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto p-2 border-2 border-foreground/10 rounded-lg">
                {goals.map((goal) => (
                  <label key={goal._id} className="flex items-center gap-2 text-sm cursor-pointer hover:bg-gray-50 px-2 py-1 rounded">
                    <input
                      type="checkbox"
                      checked={selectedGoals.includes(goal._id)}
                      onChange={() => toggleSelection(goal._id, selectedGoals, setSelectedGoals)}
                      disabled={isView}
                      className="rounded border-gray-300 disabled:opacity-50"
                    />
                    <span className={isView ? "text-gray-500" : ""}>{goal.name}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-foreground mb-2 block">Ingredients</label>
              <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto p-2 border-2 border-foreground/10 rounded-lg">
                {ingredients.map((ing) => (
                  <label key={ing._id} className="flex items-center gap-2 text-sm cursor-pointer hover:bg-gray-50 px-2 py-1 rounded">
                    <input
                      type="checkbox"
                      checked={selectedIngredients.includes(ing._id)}
                      onChange={() => toggleSelection(ing._id, selectedIngredients, setSelectedIngredients)}
                      disabled={isView}
                      className="rounded border-gray-300 disabled:opacity-50"
                    />
                    <span className={isView ? "text-gray-500" : ""}>{ing.name}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end gap-3 border-t pt-4">
          <button
            onClick={handleClose}
            className="px-5 py-2 text-sm font-medium text-foreground hover:bg-gray-100 rounded-lg transition-colors"
          >
            {isView ? "Close" : "Cancel"}
          </button>
          {!isView && (
            <button
              onClick={handleSubmit}
              disabled={loading || uploading || deleting}
              className="bg-primary-background hover:bg-primary-background/90 disabled:opacity-50 flex items-center gap-2 rounded-lg px-6 py-2 text-sm font-medium text-white transition-colors"
            >
              {loading ? (mode === "edit" ? "Updating..." : "Creating...") : (mode === "edit" ? "Update Product" : "Create Product")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
