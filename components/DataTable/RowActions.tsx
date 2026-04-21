import { MoreVertical } from "lucide-react";
import { useState } from "react";

export default function RowActions({ row, onAction }: any) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)}>
        <MoreVertical size={16} />
      </button>

      {open && (
        <div className="absolute right-0 z-10 mt-0 flex flex-col items-start rounded-md bg-white p-2 text-left shadow">
          <button
            onClick={() => onAction("view", row)}
            className="text-foreground hover:bg-primary-background/20 w-full rounded-md px-4 py-2 text-center text-sm"
          >
            View
          </button>
          <button
            onClick={() => onAction("edit", row)}
            className="text-foreground hover:bg-primary-background/20 w-full rounded-md px-4 py-2 text-center text-sm"
          >
            Edit
          </button>
          <button
            onClick={() => onAction("delete", row)}
            className="text-foreground hover:bg-primary-background/20 w-full rounded-md px-4 py-2 text-center text-sm"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
