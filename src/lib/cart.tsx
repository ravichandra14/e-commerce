import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type CartItem = { slug: string; size: string; qty: number };

type CartCtx = {
  items: CartItem[];
  add: (item: CartItem) => void;
  remove: (slug: string, size: string) => void;
  setQty: (slug: string, size: string, qty: number) => void;
  clear: () => void;
  count: number;
};

const Ctx = createContext<CartCtx | null>(null);
const KEY = "atelier-cart-v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? localStorage.getItem(KEY) : null;
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      if (typeof window !== "undefined") localStorage.setItem(KEY, JSON.stringify(items));
    } catch {}
  }, [items]);

  const value = useMemo<CartCtx>(() => ({
    items,
    add: (item) =>
      setItems((prev) => {
        const i = prev.findIndex((p) => p.slug === item.slug && p.size === item.size);
        if (i === -1) return [...prev, item];
        const next = [...prev];
        next[i] = { ...next[i], qty: next[i].qty + item.qty };
        return next;
      }),
    remove: (slug, size) =>
      setItems((prev) => prev.filter((p) => !(p.slug === slug && p.size === size))),
    setQty: (slug, size, qty) =>
      setItems((prev) =>
        prev.map((p) => (p.slug === slug && p.size === size ? { ...p, qty: Math.max(1, qty) } : p)),
      ),
    clear: () => setItems([]),
    count: items.reduce((s, i) => s + i.qty, 0),
  }), [items]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
