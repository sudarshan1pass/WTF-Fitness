export interface Product {
  id: string;
  title: string;
  price: number;
  compareAtPrice?: number;
  images: string[];
  variants: ProductVariant[];
  tags: string[];
  available: boolean;
  description: string;
  vendor: string;
  type: string;
}

export interface ProductVariant {
  id: string;
  title: string;
  price: number;
  available: boolean;
  color?: string;
  size?: string;
  image?: string;
}

export interface Collection {
  id: string;
  title: string;
  description: string;
  products: Product[];
  image: string;
}

export interface CartItem {
  product: Product;
  variant: ProductVariant;
  quantity: number;
}

export interface Location {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  inventory: Record<string, number>;
}