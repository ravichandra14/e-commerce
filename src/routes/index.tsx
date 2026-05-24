import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "@/assets/hero.jpg";
import atelierImg from "@/assets/atelier.jpg";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/site/ProductCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Maison Linen — Slow-made garments from natural fibers" },
      { name: "description", content: "Discover heirloom linen, cashmere, and leather, made in small batches across Europe." },
      { property: "og:title", content: "Maison Linen" },
      { property: "og:description", content: "Slow-made garments from natural fibers." },
    ],
  }),
  component: Index,
});

function Index() {
  const featured = products.slice(0, 4);
  return (
    <>
      {/* Hero */}
      <section className="relative">
        <img src={heroImg} alt="Model in linen tunic and trousers" width={1920} height={1080}
          className="h-[88vh] w-full object-cover" />
        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-background/30 to-transparent">
          <div className="container-x mx-auto max-w-7xl pb-16 md:pb-24">
            <p className="text-xs uppercase tracking-[0.24em] text-background/90">Autumn / Winter 26</p>
            <h1 className="mt-4 max-w-2xl font-display text-5xl leading-[1.05] text-background md:text-7xl">
              Quiet clothes, made to last a lifetime.
            </h1>
            <Link to="/shop" className="mt-8 inline-block border-b border-background pb-1 text-xs uppercase tracking-[0.2em] text-background">
              Discover the collection
            </Link>
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="container-x mx-auto max-w-7xl py-24">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Featured</p>
            <h2 className="mt-2 font-display text-4xl md:text-5xl">The essentials</h2>
          </div>
          <Link to="/shop" className="hidden text-xs uppercase tracking-[0.18em] hover:underline md:inline-block">
            View all →
          </Link>
        </div>
        <div className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p) => <ProductCard key={p.slug} product={p} />)}
        </div>
      </section>

      {/* Story */}
      <section className="bg-secondary/50">
        <div className="container-x mx-auto grid max-w-7xl items-center gap-12 py-24 md:grid-cols-2">
          <img src={atelierImg} alt="Our atelier" loading="lazy" width={1400} height={900}
            className="aspect-[4/3] w-full object-cover" />
          <div className="max-w-md">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">The Atelier</p>
            <h2 className="mt-2 font-display text-4xl md:text-5xl">A slower way of making.</h2>
            <p className="mt-6 text-base leading-relaxed text-foreground/80">
              Every garment begins with the fiber. We work with mills in Portugal, Italy, and the south of France —
              choosing materials that age beautifully and partners who pay fairly.
            </p>
            <Link to="/about" className="mt-8 inline-block border-b border-foreground pb-1 text-xs uppercase tracking-[0.2em]">
              Read our story
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container-x mx-auto max-w-7xl py-24">
        <h2 className="font-display text-4xl md:text-5xl">Shop by category</h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            { label: "Knitwear", img: products[1].image },
            { label: "Outerwear", img: products[5].image },
            { label: "Accessories", img: products[3].image },
          ].map((c) => (
            <Link key={c.label} to="/shop" className="group relative block overflow-hidden">
              <img src={c.img} alt={c.label} loading="lazy" width={800} height={1000}
                className="aspect-[3/4] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/30 to-transparent p-6">
                <h3 className="font-display text-3xl text-background">{c.label}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
