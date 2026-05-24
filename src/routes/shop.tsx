import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/site/ProductCard";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop — Maison Linen" },
      { name: "description", content: "Browse the full Maison Linen collection: knitwear, outerwear, trousers, and accessories." },
      { property: "og:title", content: "Shop — Maison Linen" },
    ],
  }),
  component: Shop,
});

const categories = ["All", "Tops", "Shirts", "Knitwear", "Trousers", "Outerwear", "Accessories"];

function Shop() {
  const [cat, setCat] = useState("All");
  const filtered = useMemo(
    () => (cat === "All" ? products : products.filter((p) => p.category === cat)),
    [cat],
  );

  return (
    <div className="container-x mx-auto max-w-7xl py-16">
      <div className="border-b border-border pb-10">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Collection</p>
        <h1 className="mt-2 font-display text-5xl md:text-6xl">Autumn / Winter</h1>
      </div>

      <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`text-xs uppercase tracking-[0.18em] transition-colors ${
              cat === c ? "text-foreground border-b border-foreground pb-1" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-12 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => <ProductCard key={p.slug} product={p} />)}
      </div>
    </div>
  );
}
