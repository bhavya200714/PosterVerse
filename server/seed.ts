import { db } from "./db";
import { products } from "@shared/schema";

const PRICES = [200, 210, 220, 230, 240, 250];

function randomPrice() {
  return PRICES[Math.floor(Math.random() * PRICES.length)];
}

const seedProducts = [
  {
    name: "Ford Mustang Shelby GT500",
    description: "A bold tribute to the iconic 1967 Shelby GT500CR 545. Ultra-light carbon fiber cladding meets raw American muscle in this stunning matte black poster. Perfect for car enthusiasts and collectors. Printed on premium 250gsm matte paper.",
    price: randomPrice(),
    image: "/images/poster-cars-1.jpeg",
    category: "Cars",
    featured: true,
  },
  {
    name: "Ferrari F1 V12 Racer",
    description: "Feel the roar of the Ferrari V12 engine with this top-down view of the iconic red F1 car. Featuring detailed specs and the legendary prancing horse badge. A must-have for Formula 1 fans. Museum-quality archival print.",
    price: randomPrice(),
    image: "/images/poster-cars-2.jpeg",
    category: "Cars",
    featured: false,
  },
  {
    name: "Land Rover Defender 110",
    description: "The rugged elegance of the Defender 110 captured in stunning detail. 5.0L V12 power meets classic British engineering in this premium matte black poster. Built for adventure, designed for your wall.",
    price: randomPrice(),
    image: "/images/poster-cars-3.jpeg",
    category: "Cars",
    featured: false,
  },
  {
    name: "Mercedes AMG G63 Brabus",
    description: "The ultimate statement of luxury performance. The Brabus-tuned AMG G63 with 900HP dominates this poster in striking grey. Detailed specs and German engineering excellence on display. Premium satin finish.",
    price: randomPrice(),
    image: "/images/poster-cars-4.jpeg",
    category: "Cars",
    featured: true,
  },
  {
    name: "Monkey D. Luffy Wanted Poster",
    description: "The legendary Straw Hat pirate's bounty poster brought to life. Monkey D. Luffy with his iconic grin and a bounty of 500,000,000 berries. A timeless One Piece collectible for every anime fan. Archival-quality print.",
    price: randomPrice(),
    image: "/images/poster-anime-1.jpeg",
    category: "Anime",
    featured: true,
  },
  {
    name: "Spider-Man Web Slinger",
    description: "Your friendly neighborhood Spider-Man in a stunning Marvel Studios collector edition poster. Peter Parker's dual identity captured in cinematic detail with the iconic NYC skyline. Premium satin finish with vivid, fade-resistant inks.",
    price: randomPrice(),
    image: "/images/poster-anime-2.jpeg",
    category: "Anime",
    featured: false,
  },
  {
    name: "Gojo Satoru Domain Expansion",
    description: "The strongest sorcerer of Jujutsu High in his signature pose. This stunning manga collage captures Gojo Satoru's most iconic moments from Jujutsu Kaisen. Bold black and white art with incredible detail. Gallery-grade print.",
    price: randomPrice(),
    image: "/images/poster-anime-3.jpeg",
    category: "Anime",
    featured: true,
  },
  {
    name: "Itachi Uchiha Akatsuki Legend",
    description: "The legendary Uchiha prodigy in his Akatsuki cloak, Sharingan blazing. This striking Naruto poster captures Itachi's enigmatic presence with manga panel art background. A masterpiece for every shinobi fan.",
    price: randomPrice(),
    image: "/images/poster-anime-4.jpeg",
    category: "Anime",
    featured: false,
  },
  {
    name: "Starry Night Van Gogh Art",
    description: "Vincent van Gogh's masterpiece reimagined as a premium wall poster. The swirling night sky reflected over calm waters creates a mesmerizing atmosphere. A timeless piece of art for any space. Printed on heavyweight fine art paper.",
    price: randomPrice(),
    image: "/images/poster-anime-5.jpeg",
    category: "Anime",
    featured: false,
  },
  {
    name: "Virat Kohli Action Frame",
    description: "King Kohli in his element — a powerful collage of the greatest modern batsman's iconic moments. From match-winning celebrations to record-breaking innings. 'If there is 1% chance, that chance is good enough.' Premium matte finish.",
    price: randomPrice(),
    image: "/images/poster-cricket-1.jpeg",
    category: "Cricket",
    featured: true,
  },
  {
    name: "MS Dhoni Captain Cool",
    description: "Captain Cool in his legendary helicopter shot pose. This dynamic poster captures Dhoni's most iconic cricketing moments in a stunning blue and black collage. A tribute to India's greatest captain. Archival-quality print.",
    price: randomPrice(),
    image: "/images/poster-cricket-2.jpeg",
    category: "Cricket",
    featured: false,
  },
  {
    name: "Cristiano Ronaldo CR7 Legend",
    description: "The GOAT in his classic Manchester United celebration. This bold red poster captures Ronaldo's raw emotion and power on the pitch. Number 7 in all his glory. Vivid, fade-resistant inks on premium matte paper.",
    price: randomPrice(),
    image: "/images/poster-football-1.jpeg",
    category: "Football",
    featured: true,
  },
];

export async function seedDatabase() {
  const existing = await db.select().from(products);
  if (existing.length === 0 || existing[0].category === "Minimal") {
    if (existing.length > 0) {
      await db.delete(products);
    }
    await db.insert(products).values(seedProducts);
    console.log("Database seeded with", seedProducts.length, "products");
  }
}
