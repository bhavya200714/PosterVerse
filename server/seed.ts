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
  {
    name: "Red Bull RB16B F1 Racer",
    description: "The championship-winning Red Bull Racing RB16B captured in stunning top-down detail. Featuring the iconic Red Bull livery, V12 engine specs and Honda power unit. A must-have for every F1 enthusiast. Premium matte finish.",
    price: randomPrice(),
    image: "/images/poster-cars-5.jpeg",
    category: "Cars",
    featured: false,
  },
  {
    name: "Mercedes AMG Petronas F1",
    description: "The legendary Mercedes W12 in its silver and teal livery. Lewis Hamilton's number 44 car with full engine specs and championship pedigree. Founded in 1926, a legacy of winning. Museum-quality archival print.",
    price: randomPrice(),
    image: "/images/poster-cars-6.jpeg",
    category: "Cars",
    featured: false,
  },
  {
    name: "McLaren MCL35M Papaya",
    description: "The iconic McLaren in its signature papaya orange livery. Daniel Ricciardo's number 3 car with detailed engine specs and racing heritage since 1963. Bold design for bold fans. Premium satin finish.",
    price: randomPrice(),
    image: "/images/poster-cars-7.jpeg",
    category: "Cars",
    featured: false,
  },
  {
    name: "Lewis Hamilton F1 Portrait",
    description: "Sir Lewis Hamilton captured in a striking portrait with the Ferrari prancing horse. Seven-time world champion, racing legend, and cultural icon. Bold red and monochrome design on premium matte paper.",
    price: randomPrice(),
    image: "/images/poster-cars-8.jpeg",
    category: "Cars",
    featured: true,
  },
  {
    name: "Mike Tyson Boxing Legend",
    description: "Iron Mike Tyson in all his glory. The Noble Art of Boxing captured in a striking red and black collage. Championship belts, knockout moments, and raw power on display. Gallery-grade heavyweight print.",
    price: randomPrice(),
    image: "/images/poster-others-1.jpeg",
    category: "Others",
    featured: true,
  },
  {
    name: "Gervonta 'Tank' Davis",
    description: "The explosive Gervonta Davis in a dramatic black and white collage. Tank's devastating power and lightning speed captured in stunning detail. Red accent artwork on premium matte paper.",
    price: randomPrice(),
    image: "/images/poster-others-2.jpeg",
    category: "Others",
    featured: false,
  },
  {
    name: "Muhammad Ali Greatest",
    description: "Float like a butterfly, sting like a bee. The Greatest of All Time standing over his fallen opponent in this iconic illustrated poster. Red and cream color palette. A timeless tribute to the legend. Archival-quality print.",
    price: randomPrice(),
    image: "/images/poster-others-3.jpeg",
    category: "Others",
    featured: true,
  },
  {
    name: "Batman Dark Knight",
    description: "I am the shadow they fear. The Dark Knight in a moody, rain-soaked portrait with the iconic bat symbol. Not born a hero, feared by criminals. Vintage grunge aesthetic on premium heavyweight paper.",
    price: randomPrice(),
    image: "/images/poster-others-4.jpeg",
    category: "Others",
    featured: false,
  },
  {
    name: "Avengers Assemble",
    description: "Earth's mightiest heroes united. Captain America, Iron Man, Thor, Hulk, Black Widow, Hawkeye, and Vision in an epic team-up poster. Cinematic detail with vivid, fade-resistant inks on premium satin paper.",
    price: randomPrice(),
    image: "/images/poster-others-5.jpeg",
    category: "Others",
    featured: false,
  },
  {
    name: "Captain America Endgame",
    description: "The moment Steve Rogers proved himself worthy. Captain America wielding Mjolnir with his vibranium shield in this stunning close-up portrait. A tribute to the First Avenger. Premium matte finish.",
    price: randomPrice(),
    image: "/images/poster-others-6.jpeg",
    category: "Others",
    featured: false,
  },
  {
    name: "Deadpool Comic Collage",
    description: "The Merc with a Mouth giving a thumbs up against a classic Marvel comic panel backdrop. Deadpool in all his fourth-wall-breaking glory. Vibrant reds and retro comic art style. Premium satin print.",
    price: randomPrice(),
    image: "/images/poster-others-7.jpeg",
    category: "Others",
    featured: false,
  },
  {
    name: "Iron Man Tony Stark",
    description: "Tony Stark, genius billionaire philanthropist. This stunning sepia-toned poster captures the man behind the Iron Man suit in cinematic detail. From weapons manufacturer to selfless hero. Gallery-grade print.",
    price: randomPrice(),
    image: "/images/poster-others-8.jpeg",
    category: "Others",
    featured: false,
  },
  {
    name: "Seedhe Maut Collage Art",
    description: "Indian hip-hop duo Seedhe Maut in an eclectic collage poster. From underground rap to sold-out concerts, their journey captured in vibrant mixed-media art. A must-have for desi hip-hop fans. Premium matte paper.",
    price: randomPrice(),
    image: "/images/poster-others-9.jpeg",
    category: "Others",
    featured: false,
  },
  {
    name: "Seedhe Maut Live Concert",
    description: "Seedhe Maut performing live in this powerful monochrome concert poster. The energy of Indian hip-hop captured in bold typography and grainy photography. Limited edition aesthetic print on heavyweight paper.",
    price: randomPrice(),
    image: "/images/poster-others-10.jpeg",
    category: "Others",
    featured: false,
  },
];

export async function seedDatabase() {
  const existing = await db.select().from(products);
  const hasOthersCategory = existing.some((p) => p.category === "Others");
  if (existing.length === 0 || existing[0].category === "Minimal" || !hasOthersCategory) {
    if (existing.length > 0) {
      await db.delete(products);
    }
    await db.insert(products).values(seedProducts);
    console.log("Database seeded with", seedProducts.length, "products");
  }
}
