import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { ShoppingBag, ArrowLeft, Minus, Plus, Truck, RotateCcw } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import ProductCard from "@/components/product-card";
import { type Product } from "@shared/schema";
import { addToCart } from "@/lib/cart-store";
import { useToast } from "@/hooks/use-toast";

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);

  const { data: product, isLoading } = useQuery<Product>({
    queryKey: ["/api/products", id],
  });

  const { data: allProducts } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const relatedProducts = allProducts
    ?.filter((p) => p.category === product?.category && p.id !== product?.id)
    .slice(0, 4) || [];

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product, quantity);
    toast({
      title: "Added to cart",
      description: `${quantity}x ${product.name} added to your cart.`,
    });
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Skeleton className="w-full aspect-[3/4] rounded-md" />
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-10 w-40" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h2 className="text-xl font-medium">Product not found</h2>
        <Link href="/shop">
          <Button variant="outline" className="mt-4 gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Shop
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-testid="page-product">
      <Link href="/shop">
        <Button variant="ghost" className="gap-2 mb-6 text-muted-foreground" data-testid="button-back">
          <ArrowLeft className="w-4 h-4" />
          Back to Shop
        </Button>
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        <div className="rounded-md overflow-hidden bg-card">
          <img
            src={product.image}
            alt={product.name}
            className="w-full aspect-[3/4] object-cover"
            data-testid="img-product-detail"
          />
        </div>

        <div className="flex flex-col justify-center">
          <Badge variant="secondary" className="w-fit mb-3" data-testid="badge-category">
            {product.category}
          </Badge>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold" data-testid="text-product-name">
            {product.name}
          </h1>
          <p className="text-2xl font-semibold mt-3" data-testid="text-product-price">
            {"\u20B9"} {product.price}
          </p>
          <p className="text-muted-foreground mt-4 leading-relaxed text-sm" data-testid="text-product-description">
            {product.description}
          </p>

          <div className="flex items-center gap-4 mt-8">
            <div className="flex items-center border rounded-md">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                data-testid="button-quantity-minus"
              >
                <Minus className="w-4 h-4" />
              </Button>
              <span className="w-10 text-center text-sm font-medium" data-testid="text-quantity">
                {quantity}
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setQuantity(quantity + 1)}
                data-testid="button-quantity-plus"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            <Button className="flex-1 gap-2" onClick={handleAddToCart} data-testid="button-add-to-cart">
              <ShoppingBag className="w-4 h-4" />
              Add to Cart
            </Button>
          </div>

          <div className="mt-8 space-y-3 border-t pt-6">
            <div className="flex items-center gap-2 text-sm">
              <Truck className="w-4 h-4 text-muted-foreground" />
              <span>Free Shipping on orders above {"\u20B9"}500</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <RotateCcw className="w-4 h-4 text-muted-foreground" />
              <span>Easy Returns – 7 Days Return Policy</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Category:</span>
              <span className="font-medium capitalize">{product.category}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Material:</span>
              <span className="font-medium">Premium Matte Paper</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Sizes:</span>
              <span className="font-medium">A4, A3, A2</span>
            </div>
          </div>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <section className="mt-16" data-testid="section-related">
          <h2 className="text-xl sm:text-2xl font-serif font-bold mb-6">You May Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
