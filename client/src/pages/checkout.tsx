import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { ArrowLeft, ShoppingBag, Loader2, CheckCircle } from "lucide-react";
import emailjs from "@emailjs/browser";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  getCartItems,
  getCartTotal,
  clearCart,
  type CartItem,
} from "@/lib/cart-store";
import { useToast } from "@/hooks/use-toast";

interface OrderData {
  items: CartItem[];
  grandTotal: number;
  customerName: string;
  customerEmail: string;
}

export default function CheckoutPage() {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [items, setItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);
  const [sending, setSending] = useState(false);
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const orderRef = useRef<OrderData | null>(null);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    pincode: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const saved = sessionStorage.getItem("posterverse_order");
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as OrderData;
        setOrderData(parsed);
        orderRef.current = parsed;
        return;
      } catch {}
    }

    const cartItems = getCartItems();
    const cartTotal = getCartTotal();
    setItems(cartItems);
    setTotal(cartTotal);
    if (cartItems.length === 0) {
      navigate("/cart");
    }
  }, [navigate]);

  const shippingFree = total >= 500;
  const shippingCost = shippingFree ? 0 : 49;
  const grandTotal = total + shippingCost;

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Enter a valid email";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^\d{10}$/.test(formData.phone.replace(/\s/g, ""))) newErrors.phone = "Enter a valid 10-digit phone number";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.pincode.trim()) newErrors.pincode = "Pincode is required";
    else if (!/^\d{6}$/.test(formData.pincode.trim())) newErrors.pincode = "Enter a valid 6-digit pincode";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatProductList = (cartItems: CartItem[]): string => {
    return cartItems
      .map((item) => `${item.product.name} \u00D7${item.quantity} \u2013 \u20B9${item.product.price * item.quantity}`)
      .join("\n");
  };

  const handlePlaceOrder = async () => {
    if (!validate()) return;
    setSending(true);

    const productList = formatProductList(items);

    const templateParams = {
      customer_name: formData.fullName,
      customer_email: formData.email,
      phone: formData.phone,
      address: formData.address,
      pincode: formData.pincode,
      products: productList,
      total: `\u20B9 ${grandTotal}`,
    };

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      const order: OrderData = {
        items: [...items],
        grandTotal,
        customerName: formData.fullName,
        customerEmail: formData.email,
      };
      sessionStorage.setItem("posterverse_order", JSON.stringify(order));
      orderRef.current = order;
      setOrderData(order);
      clearCart();
      toast({
        title: "Order placed successfully!",
        description: "You will receive a confirmation email shortly.",
      });
    } catch (error) {
      toast({
        title: "Failed to place order",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSending(false);
    }
  };

  if (orderData) {
    return (
      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col items-center text-center" data-testid="page-order-success">
        <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-6">
          <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
        </div>
        <h1 className="text-2xl font-serif font-bold" data-testid="text-order-confirmed">Order Confirmed!</h1>
        <p className="text-muted-foreground mt-2 text-sm max-w-sm" data-testid="text-order-message">
          Thank you, {orderData.customerName}! Your order has been placed successfully. A confirmation email has been sent to {orderData.customerEmail}.
        </p>
        <Card className="mt-6 p-4 w-full text-left" data-testid="card-success-summary">
          <h3 className="text-sm font-semibold mb-2">Order Summary</h3>
          <div className="space-y-1 text-sm text-muted-foreground">
            {orderData.items.map((item) => (
              <div key={item.product.id} className="flex items-center justify-between gap-2" data-testid={`row-success-item-${item.product.id}`}>
                <span className="truncate" data-testid={`text-success-product-${item.product.id}`}>{item.product.name} {"\u00D7"}{item.quantity}</span>
                <span className="shrink-0" data-testid={`text-success-price-${item.product.id}`}>{"\u20B9"} {item.product.price * item.quantity}</span>
              </div>
            ))}
            <div className="border-t pt-2 mt-2 flex items-center justify-between font-semibold text-foreground">
              <span>Total</span>
              <span data-testid="text-success-total">{"\u20B9"} {orderData.grandTotal}</span>
            </div>
          </div>
        </Card>
        <div className="flex flex-wrap gap-3 mt-8">
          <Link href="/shop">
            <Button
              className="gap-2"
              data-testid="button-continue-shopping-success"
              onClick={() => sessionStorage.removeItem("posterverse_order")}
            >
              <ShoppingBag className="w-4 h-4" />
              Continue Shopping
            </Button>
          </Link>
          <Link href="/">
            <Button
              variant="outline"
              data-testid="button-go-home"
              onClick={() => sessionStorage.removeItem("posterverse_order")}
            >
              Go Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-testid="page-checkout">
      <Link href="/cart">
        <Button variant="ghost" className="gap-2 mb-6 text-muted-foreground" data-testid="button-back-to-cart">
          <ArrowLeft className="w-4 h-4" />
          Back to Cart
        </Button>
      </Link>

      <h1 className="text-3xl font-serif font-bold mb-2" data-testid="text-checkout-heading">Checkout</h1>
      <p className="text-sm text-muted-foreground mb-8">
        Complete your order details below
      </p>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
        <div className="md:col-span-3 space-y-4">
          <Card className="p-6" data-testid="card-shipping-form">
            <h2 className="text-lg font-semibold mb-4">Shipping Details</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={(e) => handleChange("fullName", e.target.value)}
                  data-testid="input-fullname"
                />
                {errors.fullName && <p className="text-xs text-destructive mt-1" data-testid="error-fullname">{errors.fullName}</p>}
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  data-testid="input-email"
                />
                {errors.email && <p className="text-xs text-destructive mt-1" data-testid="error-email">{errors.email}</p>}
              </div>

              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="10-digit phone number"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  data-testid="input-phone"
                />
                {errors.phone && <p className="text-xs text-destructive mt-1" data-testid="error-phone">{errors.phone}</p>}
              </div>

              <div>
                <Label htmlFor="address">Full Address</Label>
                <Input
                  id="address"
                  placeholder="House no, Street, City, State"
                  value={formData.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                  data-testid="input-address"
                />
                {errors.address && <p className="text-xs text-destructive mt-1" data-testid="error-address">{errors.address}</p>}
              </div>

              <div>
                <Label htmlFor="pincode">Pincode</Label>
                <Input
                  id="pincode"
                  placeholder="6-digit pincode"
                  value={formData.pincode}
                  onChange={(e) => handleChange("pincode", e.target.value)}
                  data-testid="input-pincode"
                />
                {errors.pincode && <p className="text-xs text-destructive mt-1" data-testid="error-pincode">{errors.pincode}</p>}
              </div>
            </div>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Card className="p-6 sticky top-20" data-testid="card-order-summary">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.product.id} className="flex items-center gap-3" data-testid={`row-checkout-item-${item.product.id}`}>
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-12 h-12 object-cover rounded-md shrink-0"
                    data-testid={`img-checkout-product-${item.product.id}`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate" data-testid={`text-checkout-product-${item.product.id}`}>{item.product.name}</p>
                    <p className="text-xs text-muted-foreground">{"\u00D7"}{item.quantity}</p>
                  </div>
                  <p className="text-sm font-medium shrink-0" data-testid={`text-checkout-price-${item.product.id}`}>{"\u20B9"} {item.product.price * item.quantity}</p>
                </div>
              ))}
            </div>

            <div className="border-t mt-4 pt-4 space-y-2">
              <div className="flex items-center justify-between gap-2 text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span data-testid="text-checkout-subtotal">{"\u20B9"} {total}</span>
              </div>
              <div className="flex items-center justify-between gap-2 text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span data-testid="text-checkout-shipping">{shippingFree ? "Free" : "\u20B9 49"}</span>
              </div>
              <div className="border-t pt-2 flex items-center justify-between gap-2 font-semibold">
                <span>Total</span>
                <span data-testid="text-checkout-total">{"\u20B9"} {grandTotal}</span>
              </div>
            </div>

            <Button
              className="w-full mt-6 gap-2"
              size="lg"
              onClick={handlePlaceOrder}
              disabled={sending}
              data-testid="button-place-order"
            >
              {sending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Placing Order...
                </>
              ) : (
                "Place Order"
              )}
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
