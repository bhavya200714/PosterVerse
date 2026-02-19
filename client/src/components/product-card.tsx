import { Link } from "wouter";
import { ShoppingBag, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { type Product } from "@shared/schema";
import { addToCart } from "@/lib/cart-store";
import { useToast } from "@/hooks/use-toast";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { toast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <Link href={`/product/${product.id}`}>
      <Card
        className="group cursor-pointer overflow-visible border-transparent bg-transparent shadow-none"
        data-testid={`card-product-${product.id}`}
      >
        <div className="relative rounded-md overflow-hidden bg-card">
          <img
            src={product.image}
            alt={product.name}
            className="w-full aspect-[3/4] object-cover"
            loading="lazy"
            data-testid={`img-product-${product.id}`}
          />
          <div className="absolute top-3 right-3 flex flex-col gap-2 invisible group-hover:visible transition-opacity duration-300 opacity-0 group-hover:opacity-100">
            <Button
              size="icon"
              variant="outline"
              className="bg-background/90 backdrop-blur-sm"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              data-testid={`button-wishlist-${product.id}`}
            >
              <Heart className="w-4 h-4" />
            </Button>
          </div>
          <div className="absolute bottom-3 left-3 right-3 invisible group-hover:visible transition-opacity duration-300 opacity-0 group-hover:opacity-100">
            <Button
              className="w-full gap-2"
              onClick={handleAddToCart}
              data-testid={`button-add-cart-${product.id}`}
            >
              <ShoppingBag className="w-4 h-4" />
              Add to Cart
            </Button>
          </div>
        </div>
        <div className="pt-3 pb-1 px-1">
          <h3 className="text-sm font-medium truncate" data-testid={`text-name-${product.id}`}>
            {product.name}
          </h3>
          <p className="text-sm text-muted-foreground mt-0.5" data-testid={`text-price-${product.id}`}>
            {"\u20B9"} {product.price}
          </p>
        </div>
      </Card>
    </Link>
  );
}
