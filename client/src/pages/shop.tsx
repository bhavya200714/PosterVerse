import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearch } from "wouter";
import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import ProductCard from "@/components/product-card";
import { type Product } from "@shared/schema";

const categories = [
  { label: "All", value: "all" },
  { label: "Cars", value: "cars" },
  { label: "Anime", value: "anime" },
  { label: "Cricket", value: "cricket" },
  { label: "Football", value: "football" },
  { label: "Others", value: "others" },
];

const orientations = [
  { label: "All", value: "all" },
  { label: "Portrait", value: "portrait" },
  { label: "Landscape", value: "landscape" },
];

function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <div key={i} className="space-y-3">
          <Skeleton className="w-full aspect-[3/4] rounded-md" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/4" />
        </div>
      ))}
    </div>
  );
}

export default function Shop() {
  const searchString = useSearch();
  const urlParams = new URLSearchParams(searchString);
  const initialCategory = urlParams.get("category") || "all";

  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState(initialCategory);
  const [orientation, setOrientation] = useState("all");
  const [sortBy, setSortBy] = useState("default");

  const { data: products, isLoading, error } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h2 className="text-xl font-medium text-destructive">Failed to load products</h2>
        <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>
          Try Again
        </Button>
      </div>
    );
  }

  const filteredProducts = useMemo(() => {
    if (!products) return [];

    let filtered = [...products];

    if (category !== "all") {
      filtered = filtered.filter((p) => p.category.toLowerCase() === category.toLowerCase());
    }

    if (orientation !== "all") {
      filtered = filtered.filter((p) => p.orientation === orientation);
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return filtered;
  }, [products, category, orientation, searchQuery, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-testid="page-shop">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-serif font-bold">Shop Posters</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Browse our curated collection of premium wall art
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-6">
        <div className="relative flex-1 w-full sm:max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search posters..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
            data-testid="input-search"
          />
        </div>

        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full sm:w-44" data-testid="select-sort">
            <SlidersHorizontal className="w-4 h-4 mr-2 text-muted-foreground" />
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Default</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
            <SelectItem value="name">Name: A to Z</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-wrap items-center gap-2 mb-4">
        {categories.map((cat) => {
          const isActive = category === cat.value;
          let gradientClass = "";
          
          if (isActive) {
            if (cat.value === "anime") gradientClass = "bg-gradient-to-r from-black to-yellow-500 text-white border-none shadow-md";
            else if (cat.value === "cars") gradientClass = "bg-gradient-to-r from-gray-800 to-gray-400 text-white border-none shadow-md";
            else if (cat.value === "cricket") gradientClass = "bg-gradient-to-r from-blue-700 to-teal-500 text-white border-none shadow-md";
            else if (cat.value === "football") gradientClass = "bg-gradient-to-r from-red-800 to-red-500 text-white border-none shadow-md";
            else if (cat.value === "others") gradientClass = "bg-charcoal text-white border-none shadow-md";
            else gradientClass = "bg-primary text-primary-foreground shadow-md";
          }

          return (
            <Button
              key={cat.value}
              variant={isActive ? "default" : "outline"}
              size="sm"
              className={`rounded-full px-4 transition-all duration-300 ${gradientClass}`}
              onClick={() => setCategory(cat.value)}
              data-testid={`button-category-${cat.value}`}
            >
              {cat.label}
            </Button>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center gap-2 mb-6">
        <span className="text-xs text-muted-foreground mr-1">Orientation:</span>
        {orientations.map((o) => (
          <Button
            key={o.value}
            variant={orientation === o.value ? "default" : "outline"}
            size="sm"
            onClick={() => setOrientation(o.value)}
            data-testid={`button-orientation-${o.value}`}
          >
            {o.label}
          </Button>
        ))}
      </div>

      {isLoading ? (
        <ProductGridSkeleton />
      ) : filteredProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Search className="w-12 h-12 text-muted-foreground/50 mb-4" />
          <h3 className="text-lg font-medium">No posters found</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Try adjusting your search or filter to find what you're looking for.
          </p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => {
              setSearchQuery("");
              setCategory("all");
              setOrientation("all");
            }}
            data-testid="button-clear-filters"
          >
            Clear Filters
          </Button>
        </div>
      ) : (
        <>
          <p className="text-xs text-muted-foreground mb-4" data-testid="text-result-count">
            {filteredProducts.length} poster{filteredProducts.length !== 1 ? "s" : ""} found
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8 items-start">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
