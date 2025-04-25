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
  featured: number; // 0-10 scale, 0 = not featured
  ageRange?: string[]; // 'Gatito', 'Adulto', 'Senior'
  createdAt: string;
  attributes?: {
    [key: string]: string | number | boolean;
  };
}