import { Link } from "wouter";
import { ArrowRight, Palette, Globe, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function About() {
  return (
    <div data-testid="page-about">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl font-serif font-bold">About PosterVerse</h1>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            We believe that every wall tells a story. PosterVerse was born from a simple idea: 
            make premium, aesthetic wall art accessible to everyone. Our curated collection spans 
            from minimalist abstracts to vibrant anime illustrations, nature photography to 
            motivational typography.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: Palette,
              title: "Curated by Designers",
              description:
                "Every poster in our collection is hand-selected by our team of designers to ensure the highest aesthetic quality and appeal.",
            },
            {
              icon: Globe,
              title: "Worldwide Shipping",
              description:
                "We ship to over 50 countries with careful packaging to ensure your poster arrives in perfect condition, every time.",
            },
            {
              icon: Leaf,
              title: "Sustainable Printing",
              description:
                "Our posters are printed on FSC-certified paper using eco-friendly inks. Beautiful art that's kind to the planet.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="flex flex-col items-center text-center p-6 rounded-md bg-card border"
            >
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-4">
                <item.icon className="w-5 h-5 text-secondary-foreground" />
              </div>
              <h3 className="font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-card border-t border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold">Our Mission</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              At PosterVerse, we're on a mission to help people create spaces that inspire them daily. 
              Whether it's a dorm room, a home office, or a living room, the right piece of wall art 
              can transform a space and elevate your mood. We work directly with artists and photographers 
              to bring you unique pieces that you won't find anywhere else.
            </p>
            <Link href="/shop">
              <Button className="mt-8 gap-2" data-testid="button-explore-collection">
                Explore Our Collection
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {[
            { value: "10K+", label: "Happy Customers" },
            { value: "200+", label: "Unique Designs" },
            { value: "50+", label: "Countries Served" },
            { value: "4.9", label: "Average Rating" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-2xl sm:text-3xl font-serif font-bold" data-testid={`text-stat-${stat.label.toLowerCase().replace(/\s/g, '-')}`}>
                {stat.value}
              </p>
              <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
