import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { ArrowRight, Truck, Shield, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ProductCard from "@/components/product-card";
import { type Product } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";

function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="space-y-3">
          <Skeleton className="w-full aspect-[3/4] rounded-md" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/4" />
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const featured = products?.filter((p) => p.featured) || [];

  return (
    <div className="flex flex-col" data-testid="page-home">
      <section className="relative w-full min-h-[70vh] flex items-center" data-testid="section-hero">
        <div className="absolute inset-0">
          <img
            src="/images/hero-banner.png"
            alt="Premium poster collection displayed on modern wall"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-xl">
            <Badge variant="outline" className="mb-4 text-white/80 border-white/20 backdrop-blur-sm bg-white/10">
              New Collection 2026
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight">
              Premium Aesthetic Posters for Your Space
            </h1>
            <p className="mt-4 text-base sm:text-lg text-white/75 max-w-md leading-relaxed">
              Curated wall art that transforms any room into a gallery. From minimal to anime, find your perfect print.
            </p>
            <div className="flex flex-wrap items-center gap-3 mt-8">
              <Link href="/shop">
                <Button size="lg" className="gap-2 bg-white text-black border-white/80" data-testid="button-shop-now">
                  Shop Now
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="outline" size="lg" className="text-white border-white/30 backdrop-blur-sm bg-white/10" data-testid="button-learn-more">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" data-testid="section-features">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { icon: Truck, title: "Free Shipping", desc: "On orders over $50" },
            { icon: Shield, title: "Premium Quality", desc: "Museum-grade prints" },
            { icon: RotateCcw, title: "Easy Returns", desc: "30-day return policy" },
          ].map((feature) => (
            <div key={feature.title} className="flex items-center gap-3 p-4 rounded-md bg-card border">
              <div className="flex items-center justify-center w-10 h-10 rounded-md bg-secondary">
                <feature.icon className="w-5 h-5 text-secondary-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium">{feature.title}</p>
                <p className="text-xs text-muted-foreground">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" data-testid="section-featured">
        <div className="flex items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold">Featured Collection</h2>
            <p className="text-muted-foreground mt-1 text-sm">Hand-picked posters our customers love</p>
          </div>
          <Link href="/shop">
            <Button variant="ghost" className="gap-1 text-sm" data-testid="link-view-all">
              View All
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
        {isLoading ? (
          <ProductGridSkeleton />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {featured.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      <section className="mx-4 sm:mx-6 lg:mx-8 my-12" data-testid="section-promo">
        <div className="max-w-7xl mx-auto relative rounded-md overflow-hidden">
          <div className="bg-foreground text-background px-6 sm:px-12 py-12 sm:py-16 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <Badge variant="outline" className="mb-3 text-background/70 border-background/20">
                Limited Time Offer
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold">
                Buy 2, Get 1 Free
              </h2>
              <p className="text-background/60 mt-2 text-sm max-w-md">
                Mix and match from any category. Use code POSTER3 at checkout.
              </p>
            </div>
            <Link href="/shop">
              <Button
                size="lg"
                className="bg-background text-foreground border-background/80 shrink-0"
                data-testid="button-promo-shop"
              >
                Shop the Sale
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" data-testid="section-categories">
        <h2 className="text-2xl sm:text-3xl font-serif font-bold mb-8 text-center">
          Shop by Category
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: "Minimal", image: "/images/poster-minimal-1.png", slug: "minimal" },
            { name: "Anime", image: "/images/poster-anime-1.png", slug: "anime" },
            { name: "Nature", image: "/images/poster-nature-1.png", slug: "nature" },
            { name: "Quotes", image: "/images/poster-quotes-1.png", slug: "quotes" },
          ].map((cat) => (
            <Link key={cat.slug} href={`/shop?category=${cat.slug}`}>
              <div className="group relative rounded-md overflow-hidden cursor-pointer" data-testid={`card-category-${cat.slug}`}>
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-semibold text-lg">{cat.name}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
