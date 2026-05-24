import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { findProduct, products } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { ProductCard } from "@/components/site/ProductCard";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const product = findProduct(params.slug);
    if (!product) throw notFound();
    return { product } as const;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} — Maison Linen` },
          { name: "description", content: loaderData.product.description },
          { property: "og:title", content: loaderData.product.name },
          { property: "og:description", content: loaderData.product.description },
          { property: "og:image", content: loaderData.product.image },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="container-x mx-auto max-w-7xl py-24 text-center">
      <h1 className="font-display text-4xl">Product not found</h1>
      <Link to="/shop" className="mt-6 inline-block border-b border-foreground pb-1 text-xs uppercase tracking-[0.18em]">Back to shop</Link>
    </div>
  ),
  errorComponent: ({ reset }) => (
    <div className="container-x mx-auto max-w-7xl py-24 text-center">
      <h1 className="font-display text-3xl">Couldn't load this product</h1>
      <button onClick={reset} className="mt-6 text-xs uppercase tracking-[0.18em] underline">Try again</button>
    </div>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { add } = useCart();
  const navigate = useNavigate();
  const [size, setSize] = useState(product.sizes[0]);
  const related = products.filter((p) => p.slug !== product.slug).slice(0, 3);

  return (
    <div>
      <div className="container-x mx-auto grid max-w-7xl gap-12 py-12 md:grid-cols-2 md:py-16">
        <div className="bg-secondary/60">
          <img src={product.image} alt={product.name} width={800} height={1000}
            className="aspect-[4/5] w-full object-cover" />
        </div>
        <div className="md:py-8">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{product.category}</p>
          <h1 className="mt-2 font-display text-4xl md:text-5xl">{product.name}</h1>
          <p className="mt-4 text-lg tabular-nums">${product.price}</p>

          <p className="mt-8 max-w-md text-base leading-relaxed text-foreground/80">{product.description}</p>

          <div className="mt-10">
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Size</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`min-w-14 border px-4 py-2 text-sm transition-colors ${
                    size === s ? "border-foreground bg-foreground text-background" : "border-border hover:border-foreground"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => { add({ slug: product.slug, size, qty: 1 }); navigate({ to: "/cart" }); }}
            className="mt-10 w-full bg-foreground py-4 text-xs uppercase tracking-[0.24em] text-background transition-opacity hover:opacity-90 md:w-80"
          >
            Add to bag
          </button>

          <div className="mt-12 border-t border-border pt-8">
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Details</p>
            <ul className="mt-4 space-y-2 text-sm text-foreground/80">
              {product.details.map((d) => <li key={d}>— {d}</li>)}
            </ul>
          </div>
        </div>
      </div>

      <section className="container-x mx-auto max-w-7xl border-t border-border py-20">
        <h2 className="font-display text-3xl">You may also like</h2>
        <div className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((p) => <ProductCard key={p.slug} product={p} />)}
        </div>
      </section>
    </div>
  );
}
