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
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [showSizeModal, setShowSizeModal] = useState(false);

  const { data: product, isLoading, error } = useQuery<Product>({
    queryKey: ["/api/products", id],
    retry: false,
  });

  const { data: allProducts } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const relatedProducts = allProducts
    ?.filter((p) => p.category === product?.category && p.id !== product?.id)
    .slice(0, 4) || [];

  const handleAddToCart = () => {
    if (!product) return;
    if (!selectedSize) {
      setShowSizeModal(true);
      return;
    }
    addToCart(product, quantity, selectedSize);
    toast({
      title: "Added to cart",
      description: `${quantity}x ${product.name} (${selectedSize}) added to your cart.`,
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

  if (error || !product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h2 className="text-xl font-medium">Product not found or failed to load</h2>
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
      {showSizeModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <Card className="p-6 max-w-sm w-full shadow-2xl animate-in fade-in zoom-in duration-200">
            <h3 className="text-lg font-bold mb-4">Please select the size of your poster.</h3>
            <div className="flex gap-4 mb-6">
              {["A4", "A3"].map((size) => (
                <Button
                  key={size}
                  variant={selectedSize === size ? "default" : "outline"}
                  className="flex-1"
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </Button>
              ))}
            </div>
            <Button className="w-full" onClick={() => {
              if (selectedSize) {
                setShowSizeModal(false);
                handleAddToCart();
              }
            }}>
              Confirm & Add to Cart
            </Button>
            <Button variant="ghost" className="w-full mt-2" onClick={() => setShowSizeModal(false)}>
              Cancel
            </Button>
          </Card>
        </div>
      )}
      <Link href="/shop">
        <Button variant="ghost" className="gap-2 mb-6 text-muted-foreground hover:bg-transparent hover:text-foreground transition-colors" data-testid="button-back">
          <ArrowLeft className="w-4 h-4" />
          Back to Shop
        </Button>
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-start">
        <div className={`rounded-2xl overflow-hidden bg-muted/30 border shadow-xl group sticky top-24 ${product.orientation === 'landscape' ? 'aspect-[4/3] flex items-center justify-center' : 'aspect-[3/4]'}`}>
          <img
            src={product.image}
            alt={product.name}
            className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${product.orientation === 'landscape' ? 'scale-95 group-hover:scale-100' : ''}`}
            data-testid="img-product-detail"
            loading="lazy"
          />
          {product.orientation === 'landscape' && (
            <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-lg text-[10px] text-white px-3 py-1 rounded-full uppercase font-bold tracking-widest border border-white/20">
              Landscape Edition
            </div>
          )}
        </div>

        <div className="flex flex-col py-4">
          <Badge variant="secondary" className="w-fit mb-3" data-testid="badge-category">
            {product.category}
          </Badge>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold" data-testid="text-product-name">
            {product.name}
          </h1>
          <div className="flex items-center gap-3 mt-3" data-testid="text-product-price">
            <span className="text-xl line-through text-muted-foreground/60">
              {"\u20B9"}{product.price}
            </span>
            <span className="text-2xl font-bold">
              {"\u20B9"}{product.discountPrice}
            </span>
            <span className="text-sm font-medium text-green-600 dark:text-green-400">
              {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% off
            </span>
          </div>

          <div className="mt-6 space-y-4">
            <p className="text-muted-foreground leading-relaxed text-sm" data-testid="text-product-description">
              {product.description}
            </p>
            <div className="bg-muted/30 p-4 rounded-md space-y-2 border">
              <p className="text-sm font-semibold">Material: 300 GSM Premium Matte Paper</p>
              <p className="text-sm font-semibold">Orientation: {product.orientation === 'landscape' ? 'Landscape' : 'Portrait'}</p>
              <p className="text-sm font-semibold">Sizes: A4, A3</p>
              <p className="text-xs text-muted-foreground">Printed on 300 GSM Premium Matte Paper for rich color depth and long-lasting durability.</p>
            </div>
          </div>

          <div className="mt-8 space-y-4">
             <div className="flex flex-wrap gap-3">
               {["A4", "A3"].map((size) => (
                 <Button
                   key={size}
                   variant={selectedSize === size ? "default" : "outline"}
                   size="sm"
                   className="min-w-[60px]"
                   onClick={() => setSelectedSize(size)}
                 >
                   {size}
                 </Button>
               ))}
             </div>

            <div className="flex items-center gap-4">
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

              <Button className="flex-1 gap-2 hover:shadow-md transition-shadow" onClick={handleAddToCart} data-testid="button-add-to-cart">
                <ShoppingBag className="w-4 h-4" />
                Add to Cart
              </Button>
            </div>
          </div>

          <div className="mt-8 space-y-3 border-t pt-6">
            <div className="flex items-center gap-2 text-sm">
              <Truck className="w-4 h-4 text-muted-foreground" />
              <span>Free Shipping on orders above {"\u20B9"}399</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <RotateCcw className="w-4 h-4 text-muted-foreground" />
              <span>Easy Returns – 7 Days Return Policy</span>
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
