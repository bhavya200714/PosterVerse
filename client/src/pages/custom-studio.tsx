import { ShoppingBag, Truck, Palette, Frame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { addToCart } from "@/lib/cart-store";
import { useToast } from "@/hooks/use-toast";
import { type Product } from "@shared/schema";

const customProduct: Product = {
  id: -1,
  name: "Custom Poster – Premium Studio",
  description: "Your custom design printed on premium 250gsm matte paper with HD print quality. We will contact you after your order to discuss your custom design.",
  price: 200,
  discountPrice: 140,
  image: "/images/poster-others-1.jpeg",
  category: "Custom",
  orientation: "portrait",
  isNew: true,
  featured: true,
};

export default function CustomStudioPage() {
  const { toast } = useToast();

  const handleAddToCart = () => {
    addToCart(customProduct);
    toast({
      title: "Added to cart",
      description: "Custom Poster has been added to your cart.",
    });
  };

  return (
    <div className="min-h-screen" data-testid="page-custom-studio">
      <section className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-amber-950/30 dark:via-orange-950/20 dark:to-yellow-950/30 py-16 sm:py-24">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-amber-200/30 dark:bg-amber-800/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-200/30 dark:bg-orange-800/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex flex-col items-center text-center">
            <div className="relative w-28 h-28 mb-8">
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-amber-400/60 animate-[spin_12s_linear_infinite]" />
              <div className="absolute inset-2 rounded-full bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/40 dark:to-orange-900/40 flex items-center justify-center">
                <span className="text-xs font-bold text-amber-700 dark:text-amber-300 leading-tight text-center px-2">
                  FLAT<br />50% OFF
                </span>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 text-white text-xs font-bold tracking-wider uppercase mb-6 shadow-lg" data-testid="badge-premium">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              Premium Product
            </div>

            <h1 className="text-3xl sm:text-5xl font-serif font-bold mb-4" data-testid="text-studio-heading">
              Build Your Custom Poster Now
            </h1>

            <p className="text-muted-foreground text-sm sm:text-base max-w-lg mb-8">
              Lowest Rate Possible – Premium Matte Finish – HD Print Quality
            </p>

            <Card className="inline-flex flex-col items-center gap-3 px-8 py-6 bg-background/80 backdrop-blur-sm shadow-xl border-amber-200/50 dark:border-amber-800/30" data-testid="card-pricing">
              <div className="flex items-center gap-4">
                <span className="text-2xl line-through text-muted-foreground/50" data-testid="text-original-price">
                  {"\u20B9"}200
                </span>
                <span className="text-4xl font-bold text-foreground" data-testid="text-discount-price">
                  {"\u20B9"}140
                </span>
              </div>
              <span className="text-xs text-muted-foreground font-medium">
                You save {"\u20B9"}60 (30% off)
              </span>
            </Card>

            <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2" data-testid="badge-delivery">
                <Truck className="w-4 h-4 text-amber-600" />
                <span>Delivered in 4–6 Days</span>
              </div>
              <div className="flex items-center gap-2" data-testid="badge-hd">
                <Palette className="w-4 h-4 text-amber-600" />
                <span>HD Print Quality</span>
              </div>
              <div className="flex items-center gap-2" data-testid="badge-finish">
                <Frame className="w-4 h-4 text-amber-600" />
                <span>Premium Matte Finish</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card className="p-6 sm:p-8 text-center bg-secondary/30 border-dashed" data-testid="card-instruction">
          <p className="text-sm sm:text-base leading-relaxed text-foreground/90 font-medium">
            If you wish to order a custom poster, kindly select this product and add it to your cart.
            After placing your order, we will contact you shortly regarding your custom design.
          </p>
        </Card>

        <div className="flex justify-center mt-8">
          <Button
            size="lg"
            className="gap-2 shadow-lg"
            onClick={handleAddToCart}
            data-testid="button-add-custom-to-cart"
          >
            <ShoppingBag className="w-5 h-5" />
            Add Custom Poster to Cart – {"\u20B9"}140
          </Button>
        </div>
      </section>
    </div>
  );
}
