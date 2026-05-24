import { Link } from "@tanstack/react-router";
import type { Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link to="/products/$slug" params={{ slug: product.slug }} className="group block">
      <div className="overflow-hidden bg-secondary/60">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={800}
          height={1000}
          className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
      </div>
      <div className="mt-4 flex items-baseline justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">{product.category}</p>
          <h3 className="mt-1 font-display text-lg">{product.name}</h3>
        </div>
        <p className="text-sm tabular-nums">${product.price}</p>
      </div>
    </Link>
  );
}
