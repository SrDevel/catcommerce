export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discount: number;
  images: string[];
  category: string;
  stock: number;
  rating: number;
  reviewCount: number;
  featured: number;
  ageRange: string[];
  createdAt: string;
  attributes?: Record<string, any>;
}
