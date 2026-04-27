import { MoreVertical, Eye, Trash, Trash2Icon, Edit2Icon } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { OrderType } from "@/types/OrderType";

export default function OrderRowActions({ row, onAction }: { row: OrderType, onAction?: (action: string, row: OrderType) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button onClick={() => setOpen(!open)} className="outline-none">
        <MoreVertical size={16} />
      </button>

      {open && (
        <div className="absolute right-0 z-10 mt-1 flex flex-col items-start text-left rounded-md bg-white p-2 text-left shadow border border-gray-100">
          <button
            onClick={() => onAction?.("view", row)}
            className="text-foreground flex items-center gap-2 hover:bg-primary-background/20 w-full  rounded-md px-4 py-2 text-left text-sm transition-colors"
          >
            <Eye size={16} />
            <span>View</span>
          </button>
          <button
            onClick={() => onAction?.("edit", row)}
            className="text-foreground flex items-center gap-2 hover:bg-primary-background/20 w-full  rounded-md px-4 py-2 text-left text-sm transition-colors"
          ><Edit2Icon size={16}/>
            Edit
          </button>
          <button
            onClick={() => onAction?.("delete", row)}
            className="text-red-400  flex items-center gap-2 hover:bg-red-50 w-full rounded-md px-4 py-2 text-left text-sm transition-colors"
          ><Trash2Icon size={16} />
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
