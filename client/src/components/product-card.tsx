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
        className="group cursor-pointer overflow-visible border-transparent bg-transparent shadow-none h-full flex flex-col"
        data-testid={`card-product-${product.id}`}
      >
        <div className="relative rounded-xl overflow-hidden bg-muted/30 aspect-[3/4] flex items-center justify-center border shadow-sm group-hover:shadow-md transition-all duration-300">
          {product.isNew && (
            <div className="absolute top-3 left-3 z-10 flex items-center gap-1 bg-foreground text-background text-[10px] font-black tracking-widest uppercase px-2 py-1 rounded-sm shadow-lg" data-testid={`badge-new-${product.id}`}>
              NEW <Flame className="w-3 h-3 text-orange-500" />
            </div>
          )}
          <img
            src={product.image}
            alt={product.name}
            className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 ${product.orientation === 'landscape' ? 'scale-90 group-hover:scale-100' : ''}`}
            loading="lazy"
            data-testid={`img-product-${product.id}`}
          />
          
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 flex items-center justify-center">
            <Button
              className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 bg-white text-black hover:bg-white/90 rounded-full px-6"
              onClick={handleAddToCart}
              data-testid={`button-add-cart-${product.id}`}
            >
              <ShoppingBag className="w-4 h-4 mr-2" />
              Quick Add
            </Button>
          </div>

          {product.orientation === 'landscape' && (
            <div className="absolute bottom-2 right-2 bg-black/50 backdrop-blur-md text-[9px] text-white px-2 py-0.5 rounded-full uppercase tracking-tighter border border-white/10">
              Landscape
            </div>
          )}
        </div>
        <div className="pt-4 pb-1 px-1 flex-1 flex flex-col">
          <h3 className="text-[13px] font-semibold tracking-tight text-foreground/90 line-clamp-1 group-hover:text-primary transition-colors" data-testid={`text-name-${product.id}`}>
            {product.name}
          </h3>
          <div className="flex items-center gap-2 mt-1" data-testid={`text-price-${product.id}`}>
            <span className="text-xs font-bold text-foreground">
              {"\u20B9"}{product.discountPrice}
            </span>
            <span className="text-[10px] line-through text-muted-foreground/50">
              {"\u20B9"}{product.price}
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
}
