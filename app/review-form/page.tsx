"use client";
export default function page() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const author = e.currentTarget.author.value;
    const content = e.currentTarget.content.value;
    const rating = e.currentTarget.rating.value;
    const image = e.currentTarget.image.value;

    try {
      const res = await fetch("/api/review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ author, content, rating, image }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Something went wrong");
        return;
      }

      alert("Review created successfully");

      e.currentTarget.reset();
    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };
  return (
    <div className="flex min-h-screen items-center justify-center">
      <form onSubmit={handleSubmit} className="flex h-50 w-50 flex-col gap-2">
        <div>
          <p className="font-comfortaa text-lg font-semibold">Author</p>
          <input
            type="text"
            name="author"
            placeholder="Enter name"
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
          <p className="font-comfortaa text-lg font-semibold">Rating</p>
          <input
            type="number"
            name="rating"
            placeholder="Enter rating"
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
