import { type Product } from "@shared/schema";

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
}

const CART_KEY = "posterverse_cart";

function getCart(): CartItem[] {
  try {
    const data = localStorage.getItem(CART_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveCart(items: CartItem[]) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  window.dispatchEvent(new CustomEvent("cart-updated"));
}

export function getCartItems(): CartItem[] {
  return getCart();
}

export function getCartCount(): number {
  return getCart().reduce((sum, item) => sum + item.quantity, 0);
}

export function getCartTotal(): number {
  return getCart().reduce((sum, item) => sum + (item.product.discountPrice ?? item.product.price) * item.quantity, 0);
}

export function getShippingDetails(total: number) {
  const threshold = 399;
  const shipping = total >= threshold ? 0 : 30;
  return { threshold, shipping, isFree: total >= threshold };
}

export function addToCart(product: Product, quantity: number = 1, selectedSize?: string) {
  const items = getCart();
  const existing = items.find((item) => item.product.id === product.id && item.selectedSize === selectedSize);
  if (existing) {
    existing.quantity += quantity;
  } else {
    items.push({ product, quantity, selectedSize });
  }
  saveCart(items);
}

export function removeFromCart(productId: number) {
  const items = getCart().filter((item) => item.product.id !== productId);
  saveCart(items);
}

export function updateQuantity(productId: number, quantity: number) {
  if (quantity <= 0) {
    removeFromCart(productId);
    return;
  }
  const items = getCart();
  const existing = items.find((item) => item.product.id === productId);
  if (existing) {
    existing.quantity = quantity;
  }
  saveCart(items);
}

export function clearCart() {
  saveCart([]);
}
