import p1 from "@/assets/product-1.jpg";
import p2 from "@/assets/product-2.jpg";
import p3 from "@/assets/product-3.jpg";
import p4 from "@/assets/product-4.jpg";
import p5 from "@/assets/product-5.jpg";
import p6 from "@/assets/product-6.jpg";

export type Product = {
  slug: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  details: string[];
  sizes: string[];
};

export const products: Product[] = [
  {
    slug: "linen-camp-shirt",
    name: "Linen Camp Shirt",
    price: 148,
    category: "Shirts",
    image: p1,
    description: "A relaxed-fit camp collar shirt cut from breathable European linen. Designed to soften with every wash.",
    details: ["100% European linen", "Camp collar, pearl buttons", "Made in Portugal"],
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    slug: "ribbed-cashmere-sweater",
    name: "Ribbed Cashmere Sweater",
    price: 285,
    category: "Knitwear",
    image: p2,
    description: "Heavy-gauge ribbed knit in pure Mongolian cashmere. The kind of sweater that lasts a decade.",
    details: ["100% Grade-A cashmere", "Hand-finished seams", "Made in Italy"],
    sizes: ["XS", "S", "M", "L"],
  },
  {
    slug: "wide-leg-trouser",
    name: "Wide Leg Trouser",
    price: 195,
    category: "Trousers",
    image: p3,
    description: "High-waisted, pleated trousers with a fluid wide leg. Cut from a heavyweight cotton twill.",
    details: ["Heavyweight cotton twill", "Pleated front, side pockets", "Made in Portugal"],
    sizes: ["24", "26", "28", "30", "32"],
  },
  {
    slug: "everyday-leather-tote",
    name: "Everyday Leather Tote",
    price: 365,
    category: "Accessories",
    image: p4,
    description: "Full-grain vegetable-tanned leather, hand-stitched. Develops a unique patina over time.",
    details: ["Full-grain Italian leather", "Hand-stitched", "Made in Florence"],
    sizes: ["One size"],
  },
  {
    slug: "essential-cotton-tee",
    name: "Essential Cotton Tee",
    price: 68,
    category: "Tops",
    image: p5,
    description: "The foundational tee. Heavyweight organic cotton, garment-dyed for a lived-in feel.",
    details: ["240gsm organic cotton", "Garment-dyed", "Made in Portugal"],
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    slug: "camel-wool-coat",
    name: "Camel Wool Coat",
    price: 685,
    category: "Outerwear",
    image: p6,
    description: "A timeless double-breasted overcoat in pure virgin wool. Tailored for an oversized silhouette.",
    details: ["100% virgin wool", "Half-canvas construction", "Made in Italy"],
    sizes: ["XS", "S", "M", "L"],
  },
];

export const findProduct = (slug: string) => products.find((p) => p.slug === slug);
