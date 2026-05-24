import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Maison Linen" },
      { name: "description", content: "Get in touch with the Maison Linen team." },
      { property: "og:title", content: "Contact — Maison Linen" },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <div className="container-x mx-auto grid max-w-6xl gap-16 py-24 md:grid-cols-2">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Contact</p>
        <h1 className="mt-4 font-display text-5xl md:text-6xl">Get in touch.</h1>
        <p className="mt-6 text-foreground/80">
          We answer every email personally, usually within two working days.
        </p>
        <dl className="mt-12 space-y-6 text-sm">
          <div>
            <dt className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Email</dt>
            <dd className="mt-1">hello@maisonlinen.co</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Atelier</dt>
            <dd className="mt-1">Rua das Janelas Verdes 12<br />1200-696 Lisbon, Portugal</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Hours</dt>
            <dd className="mt-1">Tuesday – Saturday, 11 – 19</dd>
          </div>
        </dl>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-8">
        {sent ? (
          <div className="bg-secondary/60 p-8">
            <h2 className="font-display text-2xl">Thank you.</h2>
            <p className="mt-2 text-sm text-muted-foreground">We'll be in touch shortly.</p>
          </div>
        ) : (
          <>
            {[
              { label: "Name", type: "text" },
              { label: "Email", type: "email" },
              { label: "Subject", type: "text" },
            ].map((f) => (
              <label key={f.label} className="block">
                <span className="text-xs uppercase tracking-[0.16em] text-muted-foreground">{f.label}</span>
                <input type={f.type} required className="mt-2 w-full border-b border-border bg-transparent py-2 text-sm outline-none focus:border-foreground" />
              </label>
            ))}
            <label className="block">
              <span className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Message</span>
              <textarea required rows={5} className="mt-2 w-full border-b border-border bg-transparent py-2 text-sm outline-none focus:border-foreground" />
            </label>
            <button type="submit" className="w-full bg-foreground py-4 text-xs uppercase tracking-[0.24em] text-background hover:opacity-90">
              Send message
            </button>
          </>
        )}
      </form>
    </div>
  );
}
