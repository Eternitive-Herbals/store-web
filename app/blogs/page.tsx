"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

type Job = {
  title: string;
  content: string;
  image: string;
};
export default function Page() {
  const [blogs, setBlogs] = useState<Job[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("/api/blog");
        const data = await res.json();
        setBlogs(data);
      } catch (error) {
        console.error("Failed to fetch Blogs", error);
      }
    };
    fetchBlogs();
  }, []);
  console.log(blogs);

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-40">
      <h1 className="flex justify-center text-4xl font-bold">Latest Blogs</h1>
      {blogs.length == 0 ? (
        <p className="mt-2 text-center text-xl text-gray-500">No Blogs Found</p>
      ) : (
        <div className="mx-auto grid max-w-6xl grid-cols-3 gap-6">
          {blogs.map((blog, index) => (
            <div
              key={index}
              className="mt-2 rounded-2xl bg-white p-5 shadow-2xl duration-300 hover:scale-105"
            >
              <Image
                src={blog.image}
                alt="blog image"
                width={400}
                height={250}
                className="rounded-lg object-cover"
              />{" "}
              <div className="font-bold text-2xl text-gray-800 uppercase">
                {blog.title}
              </div>
              <div className="">{blog.content}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
