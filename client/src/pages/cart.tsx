import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  getCartItems,
  updateQuantity,
  removeFromCart,
  getCartTotal,
  getShippingDetails,
  type CartItem,
} from "@/lib/cart-store";
import { useToast } from "@/hooks/use-toast";

export default function CartPage() {
  const [, navigate] = useLocation();
  const [items, setItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);
  const { toast } = useToast();

  const refreshCart = () => {
    setItems(getCartItems());
    setTotal(getCartTotal());
  };

  useEffect(() => {
    refreshCart();
    window.addEventListener("cart-updated", refreshCart);
    return () => window.removeEventListener("cart-updated", refreshCart);
  }, []);

  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = () => {
    if (totalQuantity < 2) {
      toast({
        title: "Minimum order required",
        description: "Minimum order quantity is 2 posters.",
        variant: "destructive",
      });
      return;
    }
    navigate("/checkout");
  };

  const { shipping, threshold, isFree } = getShippingDetails(total);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-testid="page-cart">
      <h1 className="text-3xl font-serif font-bold mb-2">Shopping Cart</h1>
      <p className="text-sm text-muted-foreground mb-8">
        {items.length} item{items.length !== 1 ? "s" : ""} in your cart
      </p>

      <div className="space-y-3">
        {items.map((item) => (
          <Card
            key={item.product.id}
            className="p-4 flex items-center gap-4"
            data-testid={`card-cart-item-${item.product.id}`}
          >
            <Link href={`/product/${item.product.id}`}>
              <img
                src={item.product.image}
                alt={item.product.name}
                className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-md shrink-0"
              />
            </Link>
            <div className="flex-1 min-w-0">
              <Link href={item.product.id === -1 ? "/custom-studio" : `/product/${item.product.id}`}>
                <h3 className="font-medium text-sm truncate" data-testid={`text-cart-name-${item.product.id}`}>
                  {item.product.id === -1 ? "Custom Poster" : item.product.name}
                </h3>
              </Link>
              <p className="text-xs text-muted-foreground capitalize mt-0.5">
                {item.product.id === -1 ? "Custom" : item.product.category} {item.selectedSize && `• Size: ${item.selectedSize}`}
              </p>
              <div className="flex items-center gap-2 mt-1" data-testid={`text-cart-price-${item.product.id}`}>
                <span className="text-xs line-through text-muted-foreground/60">
                  {"\u20B9"}{item.product.price}
                </span>
                <span className="text-sm font-semibold">
                  {"\u20B9"}{item.product.discountPrice}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <div className="flex items-center border rounded-md">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleUpdateQuantity(item.product.id, item.quantity - 1)}
                  data-testid={`button-cart-minus-${item.product.id}`}
                >
                  <Minus className="w-3 h-3" />
                </Button>
                <span className="w-8 text-center text-sm font-medium" data-testid={`text-cart-qty-${item.product.id}`}>
                  {item.quantity}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleUpdateQuantity(item.product.id, item.quantity + 1)}
                  data-testid={`button-cart-plus-${item.product.id}`}
                >
                  <Plus className="w-3 h-3" />
                </Button>
              </div>

              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground"
                onClick={() => handleRemove(item.product.id, item.product.name)}
                data-testid={`button-cart-remove-${item.product.id}`}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <Card className="mt-6 p-6" data-testid="card-cart-summary">
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span>{"\u20B9"} {total}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Shipping</span>
            <span>{isFree ? "Free" : `\u20B9 ${shipping}`}</span>
          </div>
          {!isFree && (
            <p className="text-xs text-green-600 dark:text-green-400 font-medium">
              Add {"\u20B9"}{threshold - total} more for FREE shipping!
            </p>
          )}
          {isFree && (
            <p className="text-xs text-green-600 dark:text-green-400 font-medium">
              You unlocked free shipping!
            </p>
          )}
          <div className="border-t pt-3 flex items-center justify-between font-semibold">
            <span>Total</span>
            <span data-testid="text-cart-total">
              {"\u20B9"} {total + shipping}
            </span>
          </div>
        </div>

        <Button
          className="w-full mt-6 gap-2 hover:shadow-md transition-shadow"
          size="lg"
          onClick={handleCheckout}
          data-testid="button-checkout"
        >
          Proceed to Checkout
          <ArrowRight className="w-4 h-4" />
        </Button>

        <Link href="/shop">
          <Button variant="ghost" className="w-full mt-2 gap-2 text-muted-foreground" data-testid="button-back-to-shop">
            <ArrowLeft className="w-4 h-4" />
            Continue Shopping
          </Button>
        </Link>
      </Card>
    </div>
  );
}
