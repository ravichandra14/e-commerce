import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, X } from "lucide-react";
import { useCart } from "@/lib/cart";
import { findProduct } from "@/lib/products";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Your bag — Maison Linen" }, { name: "description", content: "Review your bag." }] }),
  component: CartPage,
});

function CartPage() {
  const { items, setQty, remove } = useCart();

  const lines = items
    .map((i) => ({ ...i, product: findProduct(i.slug) }))
    .filter((l): l is typeof l & { product: NonNullable<typeof l.product> } => !!l.product);

  const subtotal = lines.reduce((s, l) => s + l.product.price * l.qty, 0);

  if (lines.length === 0) {
    return (
      <div className="container-x mx-auto max-w-3xl py-32 text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Your bag</p>
        <h1 className="mt-4 font-display text-5xl">It's empty for now.</h1>
        <Link to="/shop" className="mt-10 inline-block border-b border-foreground pb-1 text-xs uppercase tracking-[0.2em]">
          Browse the collection
        </Link>
      </div>
    );
  }

  return (
    <div className="container-x mx-auto max-w-7xl py-16">
      <h1 className="font-display text-5xl">Your bag</h1>

      <div className="mt-12 grid gap-16 lg:grid-cols-[1fr_380px]">
        <ul className="divide-y divide-border border-y border-border">
          {lines.map((l) => (
            <li key={`${l.slug}-${l.size}`} className="flex gap-6 py-6">
              <img src={l.product.image} alt={l.product.name} width={120} height={150}
                className="h-36 w-28 flex-shrink-0 object-cover bg-secondary" loading="lazy" />
              <div className="flex flex-1 flex-col justify-between">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">{l.product.category}</p>
                    <h3 className="mt-1 font-display text-xl">{l.product.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">Size {l.size}</p>
                  </div>
                  <p className="tabular-nums">${l.product.price * l.qty}</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center border border-border">
                    <button onClick={() => setQty(l.slug, l.size, l.qty - 1)} className="p-2"><Minus className="h-3 w-3" /></button>
                    <span className="w-8 text-center text-sm tabular-nums">{l.qty}</span>
                    <button onClick={() => setQty(l.slug, l.size, l.qty + 1)} className="p-2"><Plus className="h-3 w-3" /></button>
                  </div>
                  <button onClick={() => remove(l.slug, l.size)} className="flex items-center gap-1 text-xs uppercase tracking-[0.16em] text-muted-foreground hover:text-foreground">
                    <X className="h-3 w-3" /> Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <aside className="h-fit bg-secondary/60 p-8">
          <h2 className="font-display text-2xl">Summary</h2>
          <dl className="mt-6 space-y-3 text-sm">
            <div className="flex justify-between"><dt>Subtotal</dt><dd className="tabular-nums">${subtotal}</dd></div>
            <div className="flex justify-between text-muted-foreground"><dt>Shipping</dt><dd>Calculated at checkout</dd></div>
          </dl>
          <div className="mt-6 flex justify-between border-t border-border pt-6 text-base">
            <span>Total</span><span className="tabular-nums">${subtotal}</span>
          </div>
          <Link to="/checkout" className="mt-8 block bg-foreground py-4 text-center text-xs uppercase tracking-[0.24em] text-background hover:opacity-90">
            Checkout
          </Link>
          <Link to="/shop" className="mt-4 block text-center text-xs uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground">
            Continue shopping
          </Link>
        </aside>
      </div>
    </div>
  );
}
