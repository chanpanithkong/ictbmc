"use client";

import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { productCategories, products } from "@/data/products";
import type { ProductCategory } from "@/types";
import { cn } from "@/lib/utils";
import { ProductCard } from "./product-card";
import { Button } from "@/components/ui/button";

type Filter = ProductCategory | "All";

export function ProductExplorer() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Filter>("All");

  const counts = useMemo(() => {
    const c: Record<string, number> = { All: products.length };
    for (const p of products) c[p.category] = (c[p.category] ?? 0) + 1;
    return c;
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      if (category !== "All" && p.category !== category) return false;
      if (!q) return true;
      return [p.name, p.summary, p.category, ...p.features].some((t) => t.toLowerCase().includes(q));
    });
  }, [query, category]);

  const reset = () => {
    setQuery("");
    setCategory("All");
  };

  return (
    <div>
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div role="group" aria-label="Filter by category" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 lg:mx-0 lg:flex-wrap lg:px-0">
          {(["All", ...productCategories] as Filter[]).map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={category === c}
              onClick={() => setCategory(c)}
              className={cn(
                "focus-ring inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                category === c
                  ? "bg-navy-900 text-white"
                  : "bg-white text-slate-600 ring-1 ring-slate-200 hover:text-navy-900 hover:ring-slate-300",
              )}
            >
              {c}
              <span
                className={cn(
                  "rounded-full px-1.5 text-xs",
                  category === c ? "bg-white/15 text-white" : "bg-slate-100 text-slate-500",
                )}
              >
                {counts[c] ?? 0}
              </span>
            </button>
          ))}
        </div>

        <div className="relative w-full lg:max-w-xs">
          <label htmlFor="product-search" className="sr-only">
            Search products
          </label>
          <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-slate-400" aria-hidden />
          <input
            id="product-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products or features…"
            className="h-11 w-full rounded-full bg-white pr-10 pl-10 text-sm text-navy-900 ring-1 ring-slate-200 outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-brand-500 [&::-webkit-search-cancel-button]:hidden"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="focus-ring absolute top-1/2 right-3 -translate-y-1/2 rounded-full p-1 text-slate-400 hover:text-navy-900"
            >
              <X className="size-4" />
            </button>
          )}
        </div>
      </div>

      <p aria-live="polite" className="mt-6 text-sm text-slate-500">
        Showing {filtered.length} of {products.length} products
        {category !== "All" && <> in {category}</>}
        {query.trim() && <> matching &ldquo;{query.trim()}&rdquo;</>}
      </p>

      {filtered.length > 0 ? (
        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      ) : (
        <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
          <p className="font-semibold text-navy-900">No products match your search.</p>
          <p className="mt-2 text-sm text-slate-600">
            Try a different keyword or category — or ask us about a custom solution.
          </p>
          <Button variant="secondary" size="sm" className="mt-6" onClick={reset}>
            Reset filters
          </Button>
        </div>
      )}
    </div>
  );
}
