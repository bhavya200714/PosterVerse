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
  const [sortBy, setSortBy] = useState("default");

  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const filteredProducts = useMemo(() => {
    if (!products) return [];

    let filtered = [...products];

    if (category !== "all") {
      filtered = filtered.filter((p) => p.category.toLowerCase() === category.toLowerCase());
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
  }, [products, category, searchQuery, sortBy]);

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

      <div className="flex flex-wrap items-center gap-2 mb-6">
        {categories.map((cat) => (
          <Button
            key={cat.value}
            variant={category === cat.value ? "default" : "outline"}
            size="sm"
            onClick={() => setCategory(cat.value)}
            data-testid={`button-category-${cat.value}`}
          >
            {cat.label}
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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
