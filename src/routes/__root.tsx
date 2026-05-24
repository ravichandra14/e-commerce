import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { CartProvider } from "@/lib/cart";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl">404</h1>
        <p className="mt-4 text-sm text-muted-foreground">The page you're looking for can't be found.</p>
        <Link to="/" className="mt-8 inline-block border-b border-foreground pb-1 text-xs uppercase tracking-[0.18em]">
          Return home
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-3xl">Something went wrong</h1>
        <p className="mt-2 text-sm text-muted-foreground">Please try again in a moment.</p>
        <button
          onClick={() => { router.invalidate(); reset(); }}
          className="mt-6 border-b border-foreground pb-1 text-xs uppercase tracking-[0.18em]"
        >
          Try again
        </button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Maison Linen — Slow-made garments" },
      { name: "description", content: "Slow-made garments from natural fibers. Designed in Lisbon, crafted across Europe." },
      { property: "og:title", content: "Maison Linen" },
      { property: "og:description", content: "Slow-made garments from natural fibers." },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500&family=Inter:wght@400;500&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1"><Outlet /></main>
          <Footer />
        </div>
      </CartProvider>
    </QueryClientProvider>
  );
}
