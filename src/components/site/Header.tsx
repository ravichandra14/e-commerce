import { Link } from "@tanstack/react-router";
import { ShoppingBag, Search, User } from "lucide-react";
import { useCart } from "@/lib/cart";

export function Header() {
  const { count } = useCart();
  const nav = [
    { to: "/shop", label: "Shop" },
    { to: "/about", label: "Atelier" },
    { to: "/contact", label: "Contact" },
  ];
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
      <div className="container-x mx-auto flex h-16 max-w-7xl items-center justify-between">
        <nav className="hidden flex-1 items-center gap-8 md:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-xs uppercase tracking-[0.18em] text-foreground/80 transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <Link to="/" className="font-display text-2xl tracking-wide md:text-3xl">
          Maison Linen
        </Link>
        <div className="flex flex-1 items-center justify-end gap-5 text-foreground/80">
          <button aria-label="Search" className="hidden md:block hover:text-foreground"><Search className="h-4 w-4" /></button>
          <button aria-label="Account" className="hidden md:block hover:text-foreground"><User className="h-4 w-4" /></button>
          <Link to="/cart" aria-label="Cart" className="relative flex items-center gap-2 hover:text-foreground">
            <ShoppingBag className="h-4 w-4" />
            <span className="text-xs tracking-widest">({count})</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
