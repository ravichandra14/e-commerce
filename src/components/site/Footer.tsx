import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="mt-32 border-t border-border bg-secondary/40">
      <div className="container-x mx-auto max-w-7xl py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div>
            <h3 className="font-display text-2xl">Maison Linen</h3>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              Slow-made garments from natural fibers. Designed in Lisbon, crafted across Europe.
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-foreground/70">Shop</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link to="/shop" className="hover:underline">All</Link></li>
              <li><Link to="/shop" className="hover:underline">New Arrivals</Link></li>
              <li><Link to="/shop" className="hover:underline">Knitwear</Link></li>
              <li><Link to="/shop" className="hover:underline">Outerwear</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-foreground/70">House</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link to="/about" className="hover:underline">Atelier</Link></li>
              <li><Link to="/contact" className="hover:underline">Contact</Link></li>
              <li><a className="hover:underline" href="#">Journal</a></li>
              <li><a className="hover:underline" href="#">Stockists</a></li>
            </ul>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-foreground/70">Newsletter</p>
            <p className="mt-4 text-sm text-muted-foreground">Quiet dispatches, four times a year.</p>
            <form className="mt-4 flex border-b border-foreground/40">
              <input type="email" placeholder="Email" className="flex-1 bg-transparent py-2 text-sm outline-none placeholder:text-muted-foreground" />
              <button className="text-xs uppercase tracking-[0.18em]">Join</button>
            </form>
          </div>
        </div>
        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-border pt-6 text-xs text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} Maison Linen. All rights reserved.</p>
          <div className="flex gap-6"><a href="#">Privacy</a><a href="#">Terms</a><a href="#">Shipping & Returns</a></div>
        </div>
      </div>
    </footer>
  );
}
