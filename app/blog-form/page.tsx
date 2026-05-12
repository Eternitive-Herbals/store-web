"use client";
import { toast } from "sonner";
export default function page() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const image = formData.get("image") as string;

    try {
      const res = await fetch("/api/blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ title, content, image }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Something went wrong");
        return;
      }

      toast.success("Blog created successfully");

      e.currentTarget.reset();
    } catch (error) {
      console.error(error);
      toast.error("Server error");
    }
  };
  return (
    <div className="flex min-h-screen items-center justify-center">
      <form onSubmit={handleSubmit} className="flex h-50 w-50 flex-col gap-2">
        <div>
          <p className="font-comfortaa text-lg font-semibold">Title</p>
          <input
            type="text"
            name="title"
            placeholder="Enter Title..."
            className="rounded-lg border border-gray-500 px-2 py-1 placeholder:text-gray-600"
          />
        </div>
        <div>
          <p className="font-comfortaa text-lg font-semibold">Content</p>
          <textarea
            name="content"
            placeholder="Write description..."
            className="rounded-lg border border-gray-500 px-2 py-1 placeholder:text-gray-600"
          />
        </div>
        <div>
          <p className="font-comfortaa text-lg font-semibold">Image</p>
          <input
            name="image"
            placeholder="Paste Image Link.."
            className="rounded-lg border border-gray-500 px-2 py-1 placeholder:text-gray-600"
          />
        </div>

        <button className="cursor-pointer rounded-2xl border bg-blue-600 p-2 text-lg font-semibold text-white duration-300 hover:scale-105">
          Submit
        </button>
      </form>
    </div>
  );
}