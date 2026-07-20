"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Search, X, Loader2, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ProductType } from "@/types/ProductType";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ProductType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    } else {
      setQuery("");
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const delayDebounceFn = setTimeout(async () => {
      try {
        const response = await fetch(`/api/search?query=${encodeURIComponent(query)}`);
        if (!response.ok) throw new Error("Search failed");
        
        const data = await response.json();
        if (Array.isArray(data.products)) {
          setResults(data.products);
        } else {
          setResults([]);
        }
      } catch (error) {
        console.error("Search error:", error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleResultClick = (productId: string) => {
    onClose();
    router.push(`/product/${productId}`);
  };

  const popularSearches = [
    { label: "Protein", query: "protein" },
    { label: "Whey", query: "whey" },
    { label: "Muscle Gain", query: "muscle" },
    { label: "Weight Loss", query: "loss" },
    { label: "Energy", query: "energy" },
  ];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-24 md:pt-32">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-primary-background/1 backdrop-blur-2xs cursor-pointer"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-2xl bg-primary-background/60 border border-white/20 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[70vh] backdrop-blur-xl"
        >
          <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/10">
            <Search className="text-foreground shrink-0" size={20} />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search by name, ingredients, or goals..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-transparent text-white placeholder-white/70 text-base border-none outline-none focus:ring-0 focus:outline-none"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="p-1 hover:bg-white/10 rounded-full text-zinc-400 hover:text-white transition-colors"
                type="button"
              >
                <X size={16} />
              </button>
            )}
          </div>

          <div className="flex-1 overflow-y-auto p-4 min-h-[150px] max-h-[50vh] scrollbar-thin">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-12 text-background gap-3">
                <Loader2 className="animate-spin text-zinc-300" size={32} />
                <span className="text-sm font-light">Searching products...</span>
              </div>
            ) : query.trim() === "" ? (
              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-semibold text-background uppercase tracking-wider mb-3">
                    Popular Searches
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {popularSearches.map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => setQuery(item.query)}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-800/50 hover:bg-zinc-800 text-zinc-300 hover:text-white text-sm rounded-full transition-all border border-white/5"
                        type="button"
                      >
                        <Search size={12} className="text-background" />
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="border-t border-white/5 pt-4 text-xs text-background font-light flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-foreground animate-pulse" />
                  Tip: You can search directly by ingredients (e.g. &apos;creatine&apos;) or health goals (e.g. &apos;weight loss&apos;).
                </div>
              </div>
            ) : results.length > 0 ? (
              <div className="space-y-1.5">
                <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2 px-2">
                  Products ({results.length})
                </div>
                {results.map((product) => {
                  const imageSrc =
                    product.images && product.images.length > 0
                      ? product.images[0]
                      : product.image || "/images/placeholder.jpg";

                  return (
                    <div
                      key={product._id}
                      onClick={() => handleResultClick(product._id)}
                      className="group flex items-center justify-between gap-4 p-2.5 rounded-xl hover:bg-white/5 transition-all duration-200 cursor-pointer border border-transparent hover:border-white/5"
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-zinc-800 shrink-0 border border-white/10">
                          <Image loading="lazy"
                            src={imageSrc}
                            alt={product.name}
                            fill
                            className="object-cover"
                            sizes="48px"
                          />
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-sm font-medium text-white group-hover:text-zinc-200 transition-colors truncate">
                            {product.name}
                          </h4>
                          <p className="text-xs text-zinc-400 line-clamp-1 mt-0.5 font-light">
                            {product.description}
                          </p>
                          <div className="flex flex-wrap gap-1.5 mt-1.5">
                            {product.category?.slice(0, 1).map((cat, i) => (
                              <span
                                key={i}
                                className="text-[10px] bg-zinc-800/80 text-zinc-400 px-2 py-0.5 rounded"
                              >
                                {cat.name}
                              </span>
                            ))}
                            {product.goal?.slice(0, 1).map((goal, i) => (
                              <span
                                key={i}
                                className="text-[10px] bg-zinc-800/80 text-zinc-400 px-2 py-0.5 rounded"
                              >
                                {goal.name}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-sm font-semibold text-white/90 group-hover:text-white">
                          ₹{product.price}
                        </span>
                        <ArrowRight
                          size={14}
                          className="text-zinc-500 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-200"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-zinc-500 gap-2">
                <span className="text-lg">😕</span>
                <span className="text-sm font-medium text-zinc-400">No products found</span>
                <span className="text-xs font-light text-zinc-500 text-center px-6">
                  We couldn&apos;t find anything matching &quot;{query}&quot;. Try checking the spelling or searching for another keyword.
                </span>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
