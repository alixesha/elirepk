import { createContext, useContext, useState, ReactNode } from 'react';
import { CartItem, Product } from '../types';

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number, size?: string, color?: string) => void;
  removeFromCart: (productId: string, size?: string, color?: string) => void;
  updateQuantity: (productId: string, quantity: number, size?: string, color?: string) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const getKey = (productId: string, size?: string, color?: string) =>
    `${productId}-${size || ''}-${color || ''}`;

  const addToCart = (product: Product, quantity = 1, size?: string, color?: string) => {
    setItems((prev) => {
      const key = getKey(product.id, size, color);
      const existing = prev.find(
        (i) => getKey(i.product.id, i.size, i.color) === key
      );
      if (existing) {
        return prev.map((i) =>
          getKey(i.product.id, i.size, i.color) === key
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      }
      return [...prev, { product, quantity, size, color }];
    });
  };

  const removeFromCart = (productId: string, size?: string, color?: string) => {
    const key = getKey(productId, size, color);
    setItems((prev) =>
      prev.filter((i) => getKey(i.product.id, i.size, i.color) !== key)
    );
  };

  const updateQuantity = (productId: string, quantity: number, size?: string, color?: string) => {
    const key = getKey(productId, size, color);
    if (quantity <= 0) {
      removeFromCart(productId, size, color);
      return;
    }
    setItems((prev) =>
      prev.map((i) =>
        getKey(i.product.id, i.size, i.color) === key ? { ...i, quantity } : i
      )
    );
  };

  const clearCart = () => setItems([]);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
