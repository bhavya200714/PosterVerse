import { Link } from "wouter";
import { ShoppingBag, Heart, Flame } from "lucide-react";
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
    <Link href={product.id === -1 ? "/custom-studio" : `/product/${product.id}`}>
      <Card
        className="group cursor-pointer overflow-visible border-transparent bg-transparent shadow-none"
        data-testid={`card-product-${product.id}`}
      >
        <div className="relative rounded-md overflow-hidden bg-card">
          {product.isNew && (
            <div className="absolute top-3 left-3 z-10 flex items-center gap-1 bg-foreground text-background text-xs font-bold px-2 py-1 rounded-full shadow-lg" data-testid={`badge-new-${product.id}`}>
              NEW <Flame className="w-3 h-3" />
            </div>
          )}
          <img
            src={product.image}
            alt={product.name}
            className="w-full aspect-[3/4] object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
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
          <div className="flex items-center gap-2 mt-0.5" data-testid={`text-price-${product.id}`}>
            <span className="text-sm line-through text-muted-foreground/60">
              {"\u20B9"}{product.price}
            </span>
            <span className="text-sm font-bold text-foreground">
              {"\u20B9"}{product.discountPrice}
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
}
