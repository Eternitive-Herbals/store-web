"use client";

import { useState, useEffect } from "react";
import { getAllCategories, createCategory, deleteCategory, updateCategory } from "@/lib/categoryAction";
import { Trash2, Plus, Edit } from "lucide-react";
import Modal from "@/components/genericModal/Modal";

export default function CategorySection({
  isOpen,
  onClose,
}: { 
  isOpen: string;
  onClose: (val: string) => void;
}) {
  const [categories, setCategories] = useState<any[]>([]);
  const [fetching, setFetching] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<any | null>(null);
 

  const fetchCategories = async () => {
    setFetching(true);
    try {
      const data = await getAllCategories();
      setCategories(data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (name: string) => {
    if (!name.trim()) return;
    try {
      if (selectedCategory) {
        await updateCategory(selectedCategory._id, name);
      } else {
        await createCategory(name);
      }
      onClose("");
      fetchCategories();
      setSelectedCategory(null);
    } catch (error) {
      console.error(error);
      alert(`Failed to ${selectedCategory ? "update" : "create"} category`);
    }
  };

  const handleEdit = (category: any) => {
    setSelectedCategory(category);
    onClose("category"); // Reuse same modal open state
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this category?")) return;
    try {
      await deleteCategory(id);
      fetchCategories();
    } catch (error) {
      console.error(error);
      alert("Failed to delete category");
    }
  };

  return (
    <div className="bg-white rounded-xl bg-background border-2 border-foreground/10 p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-foreground">Categories</h2>
        <button
          onClick={() => onClose("category")}
          className="bg-primary-background hover:bg-primary-background/90 ml-2 flex items-center gap-2 rounded-full px-4 py-2.5 text-sm text-background"
        >
           Category <Plus size={16} />
        </button>
      </div>

      <Modal 
        open={isOpen === "category"}
        onClose={() => {
          onClose("");
          setSelectedCategory(null);
        }}
        onCreate={handleSubmit}
        title="Category"
        initialData={selectedCategory ? { name: selectedCategory.name } : null}
      />
      
      {fetching ? (
        <p className="text-sm text-foreground">Loading categories...</p>
      ) : categories.length === 0 ? (
        <p className="text-sm text-foreground">No categories found.</p>
      ) : (
        <div className="h-full overflow-y-auto">
          {categories.map((cat, idx) => (
            <div
              key={cat._id}
              className={`flex items-center justify-between p-3 ${
                idx % 2 === 0 ? "bg-primary-background/5" : "bg-white"
              }`}
            >
              <span className="font-medium text-sm flex-1 text-foreground">{cat.name}</span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleEdit(cat)}
                  className="text-slate-400 hover:text-primary-background hover:bg-slate-100 p-2 rounded transition-colors"
                  title="Edit"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => handleDelete(cat._id)}
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
