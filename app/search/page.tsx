"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

type Product = {
  _id: string;
  name: string;
  image: string;
  description: string;
  ingredients: { name: string }[];
  goal: { name: string }[];
  price: number;
};

export default function SearchPage() {
  const searchParams = useSearchParams();

  const query = searchParams.get("query") || "";

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (!query) return;

    const fetchProducts = async () => {
      const res = await fetch(`/api/search?query=${query}`);
      const data = await res.json();

      if (Array.isArray(data.products)) {
        setProducts(data.products);
      } else {
        setProducts([]);
      }
    };

    fetchProducts();
  }, [query]);

  return (
    <div className="min-h-screen bg-gray-100 p-6 py-35">
      <div className="mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">
            No products found
          </p>
        ) : (
          products.map((product) => (
            <div
              key={product._id}
              className="rounded-xl bg-white p-4 shadow-md transition hover:shadow-xl"
            >
              <Image
                src={product.image}
                alt="product"
                width={400}
                height={200}
                className="h-40 w-full rounded-lg object-cover"
              />

              <h3 className="mt-3 text-lg font-semibold">{product.name}</h3>

              <p className="text-sm text-gray-600">{product.description}</p>

              <div className="mt-2 text-sm">
                <span className="font-semibold">Ingredients:</span>{" "}
                {product.ingredients?.map((i) => i.name).join(", ")}
              </div>

              <div className="mt-1 text-sm">
                <span className="font-semibold">Goal:</span>{" "}
                {product.goal?.map((g) => g.name).join(", ")}
              </div>

              <div className="mt-3 text-lg font-bold text-blue-600">
                ₹{product.price}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
