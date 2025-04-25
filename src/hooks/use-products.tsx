import { useState, useEffect } from 'react';
import { Product } from '@/types/product';
import { mockProducts } from '@/data/products';

interface ProductsFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  sort?: string;
  ageFilters?: string[];
}

interface ProductsHookReturn {
  products: Product[] | null;
  isLoading: boolean;
  error: Error | null;
  hasMore: boolean;
  loadMore: () => void;
}

export function useProducts(filters: ProductsFilters = {}): ProductsHookReturn {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [filteredProducts, setFilteredProducts] = useState<Product[] | null>(null);
  const [displayedProducts, setDisplayedProducts] = useState<Product[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const productsPerPage = 12;

  // Fetch all products (in a real app, this would be paginated from an API)
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      
      try {
        // Simulate API request
        await new Promise(resolve => setTimeout(resolve, 800));
        setProducts(mockProducts);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Error al cargar productos'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Apply filters
  useEffect(() => {
    if (!products) return;
    
    let result = [...products];
    
    // Filter by category
    if (filters.category) {
      result = result.filter(product => product.category === filters.category);
    }
    
    // Filter by price range
    if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
      result = result.filter(product => {
        const effectivePrice = product.discount 
          ? product.price * (1 - product.discount / 100) 
          : product.price;
          
        return (filters.minPrice === undefined || effectivePrice >= filters.minPrice) &&
               (filters.maxPrice === undefined || effectivePrice <= filters.maxPrice);
      });
    }
    
    // Filter by search term
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(searchLower) || 
        product.description.toLowerCase().includes(searchLower)
      );
    }
    
    // Filter by age
    if (filters.ageFilters && filters.ageFilters.length > 0) {
      result = result.filter(product => 
        product.ageRange && filters.ageFilters?.some(age => product.ageRange?.includes(age))
      );
    }
    
    // Sort products
    if (filters.sort) {
      switch (filters.sort) {
        case 'price-asc':
          result.sort((a, b) => {
            const priceA = a.discount ? a.price * (1 - a.discount / 100) : a.price;
            const priceB = b.discount ? b.price * (1 - b.discount / 100) : b.price;
            return priceA - priceB;
          });
          break;
        case 'price-desc':
          result.sort((a, b) => {
            const priceA = a.discount ? a.price * (1 - a.discount / 100) : a.price;
            const priceB = b.discount ? b.price * (1 - b.discount / 100) : b.price;
            return priceB - priceA;
          });
          break;
        case 'rating-desc':
          result.sort((a, b) => b.rating - a.rating);
          break;
        case 'newest':
          result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          break;
        default: // 'featured'
          result.sort((a, b) => b.featured - a.featured);
          break;
      }
    }
    
    setFilteredProducts(result);
    setPage(1); // Reset pagination when filters change
  }, [products, filters]);

  // Paginate results
  useEffect(() => {
    if (!filteredProducts) return;
    
    const lastIndex = page * productsPerPage;
    const paginatedProducts = filteredProducts.slice(0, lastIndex);
    
    setDisplayedProducts(paginatedProducts);
    setHasMore(lastIndex < filteredProducts.length);
  }, [filteredProducts, page]);

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return {
    products: displayedProducts,
    isLoading,
    error,
    hasMore,
    loadMore
  };
}

export function useFeaturedProducts() {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      setIsLoading(true);
      
      try {
        // Simulate API request
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Filter for featured products
        const featured = mockProducts
          .filter(product => product.featured > 0)
          .sort((a, b) => b.featured - a.featured)
          .slice(0, 8);
          
        setProducts(featured);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Error al cargar productos destacados'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  return { products, isLoading, error };
}