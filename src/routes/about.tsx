import { createFileRoute } from "@tanstack/react-router";
import atelierImg from "@/assets/atelier.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Atelier — Maison Linen" },
      { name: "description", content: "The story behind Maison Linen — a slow-made house of natural-fiber clothing." },
      { property: "og:title", content: "The Atelier — Maison Linen" },
      { property: "og:image", content: atelierImg },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div>
      <section className="container-x mx-auto max-w-4xl py-24 text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">The Atelier</p>
        <h1 className="mt-4 font-display text-5xl md:text-7xl leading-[1.05]">
          We make few things, slowly, and with intention.
        </h1>
        <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-foreground/80">
          Maison Linen began in a small studio in Lisbon, founded on a belief that clothes
          should be honest — in their materials, their making, and the hands that craft them.
        </p>
      </section>

      <img src={atelierImg} alt="The atelier" width={1400} height={900} loading="lazy"
        className="aspect-[16/9] w-full object-cover" />

      <section className="container-x mx-auto grid max-w-6xl gap-16 py-24 md:grid-cols-3">
        {[
          { n: "01", t: "Natural fibers", d: "Linen, cotton, cashmere, wool, leather. Materials chosen for how they wear, age, and biodegrade." },
          { n: "02", t: "European craft", d: "Made in small workshops in Portugal, Italy, and France — partners who share our standards and pace." },
          { n: "03", t: "Built to last", d: "We design for years of wear, not seasons. Repairs are offered free, for life." },
        ].map((b) => (
          <div key={b.n}>
            <p className="font-display text-3xl text-muted-foreground">{b.n}</p>
            <h3 className="mt-4 font-display text-2xl">{b.t}</h3>
            <p className="mt-3 text-foreground/80">{b.d}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
