export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: 'clothing' | 'watches' | 'shoes';
  image: string;
  images: string[];
  rating: number;
  reviews: number;
  description: string;
  sizes?: string[];
  colors?: string[];
  badge?: string;
  inStock: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  size?: string;
  color?: string;
}

export interface WishlistItem {
  product: Product;
}

export type Page =
  | 'home'
  | 'product'
  | 'cart'
  | 'checkout'
  | 'category'
  | 'order-success';

export interface NavigationState {
  page: Page;
  productId?: string;
  category?: string;
}
