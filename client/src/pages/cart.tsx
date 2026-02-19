import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  getCartItems,
  updateQuantity,
  removeFromCart,
  getCartTotal,
  type CartItem,
} from "@/lib/cart-store";
import { useToast } from "@/hooks/use-toast";

export default function CartPage() {
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

  const handleUpdateQuantity = (productId: number, qty: number) => {
    updateQuantity(productId, qty);
    refreshCart();
  };

  const handleRemove = (productId: number, productName: string) => {
    removeFromCart(productId);
    refreshCart();
    toast({
      title: "Removed from cart",
      description: `${productName} has been removed.`,
    });
  };

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col items-center text-center" data-testid="page-cart-empty">
        <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-6">
          <ShoppingBag className="w-7 h-7 text-muted-foreground" />
        </div>
        <h1 className="text-2xl font-serif font-bold">Your cart is empty</h1>
        <p className="text-muted-foreground mt-2 text-sm max-w-sm">
          Looks like you haven't added any posters yet. Browse our collection to find your perfect print.
        </p>
        <Link href="/shop">
          <Button className="mt-6 gap-2" data-testid="button-continue-shopping">
            <ArrowLeft className="w-4 h-4" />
            Continue Shopping
          </Button>
        </Link>
      </div>
    );
  }

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
              <Link href={`/product/${item.product.id}`}>
                <h3 className="font-medium text-sm truncate" data-testid={`text-cart-name-${item.product.id}`}>
                  {item.product.name}
                </h3>
              </Link>
              <p className="text-xs text-muted-foreground capitalize mt-0.5">
                {item.product.category}
              </p>
              <p className="text-sm font-semibold mt-1" data-testid={`text-cart-price-${item.product.id}`}>
                ${item.product.price.toFixed(2)}
              </p>
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
            <span>${total.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Shipping</span>
            <span>{total >= 50 ? "Free" : "$5.99"}</span>
          </div>
          <div className="border-t pt-3 flex items-center justify-between font-semibold">
            <span>Total</span>
            <span data-testid="text-cart-total">
              ${(total >= 50 ? total : total + 5.99).toFixed(2)}
            </span>
          </div>
        </div>

        <Button
          className="w-full mt-6 gap-2"
          size="lg"
          onClick={() =>
            toast({
              title: "Checkout",
              description: "Checkout functionality coming soon!",
            })
          }
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
