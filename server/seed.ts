import { db } from "./db";
import { products } from "@shared/schema";

const seedProducts = [
  {
    name: "Geometric Harmony",
    description: "A stunning minimalist poster featuring clean geometric shapes in neutral earth tones. Perfect for modern spaces that crave simplicity and elegance. Printed on premium 250gsm matte paper.",
    price: 29.99,
    image: "/images/poster-minimal-1.png",
    category: "Minimal",
    featured: true,
  },
  {
    name: "Mountain Lines",
    description: "A serene single-line mountain landscape drawing in classic black ink on cream. Scandinavian-inspired design that brings calm to any room. Museum-quality archival print.",
    price: 24.99,
    image: "/images/poster-minimal-2.png",
    category: "Minimal",
    featured: false,
  },
  {
    name: "Organic Forms",
    description: "Abstract organic shapes in warm terracotta and sage green tones. A bohemian-modern poster that adds warmth and character. Giclée printed for vibrant, long-lasting color.",
    price: 27.99,
    image: "/images/poster-minimal-3.png",
    category: "Minimal",
    featured: false,
  },
  {
    name: "Samurai Sunset",
    description: "A dramatic anime-style illustration of a lone samurai on a clifftop overlooking the ocean at sunset. Inspired by Studio Ghibli's masterful storytelling. Vivid, fade-resistant inks.",
    price: 34.99,
    image: "/images/poster-anime-1.png",
    category: "Anime",
    featured: true,
  },
  {
    name: "Neon Nights",
    description: "Immerse yourself in a cyberpunk Tokyo streetscape glowing with neon pink and electric blue. Detailed manga-style art that captures the energy of the future city. Premium satin finish.",
    price: 32.99,
    image: "/images/poster-anime-2.png",
    category: "Anime",
    featured: true,
  },
  {
    name: "Spirit Forest",
    description: "Step into a mystical anime woodland filled with fireflies and an ancient shrine gate. Ethereal lighting and rich color create a magical atmosphere. Archival-quality print.",
    price: 31.99,
    image: "/images/poster-anime-3.png",
    category: "Anime",
    featured: false,
  },
  {
    name: "Golden Dawn",
    description: "Majestic misty mountains bathed in golden dawn light. Fine art nature photography that brings the grandeur of the outdoors to your wall. Printed on heavyweight fine art paper.",
    price: 36.99,
    image: "/images/poster-nature-1.png",
    category: "Nature",
    featured: true,
  },
  {
    name: "Ocean Bliss",
    description: "A breathtaking aerial view of turquoise waves meeting white sand. This tropical paradise photograph transports you to paradise. UV-resistant archival inks ensure lasting beauty.",
    price: 34.99,
    image: "/images/poster-nature-2.png",
    category: "Nature",
    featured: false,
  },
  {
    name: "Autumn Path",
    description: "Wander through a magical forest path blanketed in golden autumn leaves. Atmospheric fog and warm light create an enchanting scene. Gallery-grade canvas-texture paper.",
    price: 33.99,
    image: "/images/poster-nature-3.png",
    category: "Nature",
    featured: false,
  },
  {
    name: "Create Your Sunshine",
    description: "An elegant motivational typography poster with warm, uplifting energy. The serif lettering on a soft gradient background is perfect for home offices and creative spaces.",
    price: 22.99,
    image: "/images/poster-quotes-1.png",
    category: "Quotes",
    featured: false,
  },
  {
    name: "Stay Wild",
    description: "Bold modern typography against a dark, textured background. A minimalist statement piece for those with an adventurous spirit. Matte laminate finish for durability.",
    price: 24.99,
    image: "/images/poster-quotes-2.png",
    category: "Quotes",
    featured: true,
  },
  {
    name: "Dream Without Limits",
    description: "Graceful calligraphy on a soft watercolor wash in blush pink and gold. An inspiring reminder to dream big, perfect for bedrooms and studios. Premium watercolor paper.",
    price: 26.99,
    image: "/images/poster-quotes-3.png",
    category: "Quotes",
    featured: false,
  },
];

export async function seedDatabase() {
  const existing = await db.select().from(products);
  if (existing.length === 0) {
    await db.insert(products).values(seedProducts);
    console.log("Database seeded with", seedProducts.length, "products");
  }
}
