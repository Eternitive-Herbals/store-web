"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { getAllGoals, createGoal, deleteGoal, updateGoal } from "@/lib/goalAction";
import { Trash2, Plus, Edit } from "lucide-react";
import Modal from "@/components/genericModal/Modal";
export default function GoalSection({
  isOpen,
  onClose,
}: { 
  isOpen: string;
  onClose: (val: string) => void;
}) {
  const [goals, setGoals] = useState<any[]>([]);
  const [fetching, setFetching] = useState(true);
  const [selectedGoal, setSelectedGoal] = useState<any | null>(null);

  const fetchGoals = async () => {
    setFetching(true);
    try {
      const data = await getAllGoals();
      setGoals(data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  const handleSubmit = async (name: string, previewUrl?: string) => {
    if (!name.trim() || !previewUrl) {
      toast.warning("Please enter a name and upload an image.");
      return;
    }
    try {
      if (selectedGoal) {
        await updateGoal(selectedGoal._id, name, previewUrl);
      } else {
        await createGoal(name, previewUrl);
      }
      onClose("");
      fetchGoals();
      setSelectedGoal(null);
    } catch (error) {
      console.error(error);
      toast.error(`Failed to ${selectedGoal ? "update" : "create"} goal`);
    }
  };

  const handleEdit = (goal: any) => {
    setSelectedGoal(goal);
    onClose("goal");
  };



  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this goal?")) return;
    try {
      await deleteGoal(id);
      fetchGoals();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete goal");
    }
  };

  return (
    <div className="bg-white rounded-xl bg-background border-2 border-foreground/10 p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-foreground">Goals</h2>
        <button
          onClick={() => onClose("goal")}
          className="bg-primary-background hover:bg-primary-background/90 ml-2 flex items-center gap-2 rounded-full  px-4 py-2.5 text-sm text-background"
        >
           Goal <Plus size={16} />
        </button>
      </div>

      <Modal 
        open={isOpen === "goal"}
        onClose={() => {
          onClose("");
          setSelectedGoal(null);
        }}
        onCreate={handleSubmit}
        title="Goal"
        isImageUpload={true}
        initialData={selectedGoal ? { name: selectedGoal.name, image: selectedGoal.image } : null}
      />
      
      {fetching ? (
        <p className="text-sm text-foreground">Loading goals...</p>
      ) : goals.length === 0 ? (
        <p className="text-sm text-foreground">No goals found.</p>
      ) : (
        <div className="h-full overflow-y-auto">
          {goals.map((goal, idx) => (
            <div
              key={goal._id}
              className={`flex items-center gap-4 p-3 ${
                idx % 2 === 0 ? "bg-primary-background/5" : "bg-white"
              }`}
            >
              {goal.image ? (
                <img src={goal.image} alt={goal.name} className="w-10 h-10 rounded-md object-cover" />
              ) : (
                <div className="w-10 h-10 rounded-md bg-gray-200 flex items-center justify-center text-xs text-gray-400">No Img</div>
              )}
              <span className="font-medium text-sm flex-1 text-foreground">{goal.name}</span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleEdit(goal)}
                  className="text-slate-400 hover:text-primary-background hover:bg-slate-100 p-2 rounded transition-colors"
                  title="Edit"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => handleDelete(goal._id)}
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
