"use client";
import Image from "next/image";
import { useState } from "react";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);

  const handleSearch = async () => {
    const res = await fetch(`/api/search?query=${query}`);
    const data = await res.json();

    if (Array.isArray(data.products)) {
      setProducts(data.products);
    } else {
      setProducts([]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 py-35">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="mb-6 text-3xl font-bold">Search Products</h1>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search by ingredient (e.g. Calcium)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="w-full rounded-lg border p-3 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />

          <button
            onClick={handleSearch}
            className="rounded-lg bg-blue-600 px-6 text-white hover:bg-blue-700"
          >
            Search
          </button>
        </div>
      </div>

      <div className="mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {!Array.isArray(products) || products.length === 0 ? (
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
