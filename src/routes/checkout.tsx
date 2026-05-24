import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { findProduct } from "@/lib/products";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — Maison Linen" }, { name: "description", content: "Secure checkout." }] }),
  component: Checkout,
});

function Field({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-[0.16em] text-muted-foreground">{label}</span>
      <input
        {...props}
        className="mt-2 w-full border-b border-border bg-transparent py-2 text-sm outline-none focus:border-foreground"
      />
    </label>
  );
}

function Checkout() {
  const { items, clear } = useCart();
  const navigate = useNavigate();
  const [done, setDone] = useState(false);

  const lines = items
    .map((i) => ({ ...i, product: findProduct(i.slug) }))
    .filter((l): l is typeof l & { product: NonNullable<typeof l.product> } => !!l.product);
  const subtotal = lines.reduce((s, l) => s + l.product.price * l.qty, 0);
  const shipping = subtotal > 200 ? 0 : 12;
  const total = subtotal + shipping;

  if (done) {
    return (
      <div className="container-x mx-auto max-w-2xl py-32 text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Thank you</p>
        <h1 className="mt-4 font-display text-5xl">Your order is on its way.</h1>
        <p className="mt-6 text-muted-foreground">A confirmation has been sent to your email.</p>
        <button onClick={() => navigate({ to: "/" })} className="mt-10 border-b border-foreground pb-1 text-xs uppercase tracking-[0.2em]">
          Back home
        </button>
      </div>
    );
  }

  return (
    <div className="container-x mx-auto max-w-6xl py-16">
      <h1 className="font-display text-5xl">Checkout</h1>

      <form
        onSubmit={(e) => { e.preventDefault(); clear(); setDone(true); }}
        className="mt-12 grid gap-16 lg:grid-cols-[1fr_400px]"
      >
        <div className="space-y-12">
          <section>
            <h2 className="font-display text-2xl">Contact</h2>
            <div className="mt-6 grid gap-6">
              <Field label="Email" type="email" required />
            </div>
          </section>

          <section>
            <h2 className="font-display text-2xl">Shipping address</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <Field label="First name" required />
              <Field label="Last name" required />
              <Field label="Address" required className="sm:col-span-2" />
              <Field label="City" required />
              <Field label="Postal code" required />
              <Field label="Country" defaultValue="Portugal" required />
              <Field label="Phone" type="tel" />
            </div>
          </section>

          <section>
            <h2 className="font-display text-2xl">Payment</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <Field label="Card number" placeholder="•••• •••• •••• ••••" required className="sm:col-span-2" />
              <Field label="Expiry" placeholder="MM / YY" required />
              <Field label="CVC" placeholder="•••" required />
            </div>
          </section>

          <button type="submit" className="w-full bg-foreground py-4 text-xs uppercase tracking-[0.24em] text-background hover:opacity-90">
            Place order — ${total}
          </button>
        </div>

        <aside className="h-fit bg-secondary/60 p-8">
          <h2 className="font-display text-2xl">Order</h2>
          <ul className="mt-6 divide-y divide-border">
            {lines.map((l) => (
              <li key={`${l.slug}-${l.size}`} className="flex gap-4 py-4">
                <img src={l.product.image} alt={l.product.name} className="h-20 w-16 object-cover bg-secondary" loading="lazy" />
                <div className="flex flex-1 flex-col justify-between text-sm">
                  <div>
                    <p>{l.product.name}</p>
                    <p className="text-xs text-muted-foreground">Size {l.size} · Qty {l.qty}</p>
                  </div>
                  <p className="tabular-nums">${l.product.price * l.qty}</p>
                </div>
              </li>
            ))}
          </ul>
          <dl className="mt-6 space-y-2 border-t border-border pt-6 text-sm">
            <div className="flex justify-between"><dt>Subtotal</dt><dd className="tabular-nums">${subtotal}</dd></div>
            <div className="flex justify-between"><dt>Shipping</dt><dd className="tabular-nums">{shipping === 0 ? "Free" : `$${shipping}`}</dd></div>
            <div className="flex justify-between border-t border-border pt-3 text-base"><dt>Total</dt><dd className="tabular-nums">${total}</dd></div>
          </dl>
        </aside>
      </form>
    </div>
  );
}
