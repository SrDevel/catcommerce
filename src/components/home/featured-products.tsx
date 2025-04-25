import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useFeaturedProducts } from '@/hooks/use-products';
import { ProductCard } from '@/components/products/product-card';
import { Badge } from '@/components/ui/badge';

export function FeaturedProducts() {
  const { products, isLoading, error } = useFeaturedProducts();
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [showControls, setShowControls] = useState(false);
  const [sliderWidth, setSliderWidth] = useState(0);
  const [itemWidth, setItemWidth] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  // Calculate dimensions on mount and resize
  useEffect(() => {
    const handleResize = () => {
      if (sliderRef.current) {
        const containerWidth = sliderRef.current.clientWidth;
        setSliderWidth(containerWidth);
        
        let perPage = 4;
        if (window.innerWidth < 640) {
          perPage = 1;
        } else if (window.innerWidth < 1024) {
          perPage = 2;
        } else if (window.innerWidth < 1280) {
          perPage = 3;
        }
        
        setItemsPerPage(perPage);
        setItemWidth(containerWidth / perPage);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Update controls visibility based on products
  useEffect(() => {
    if (products && products.length > itemsPerPage) {
      setShowControls(true);
    } else {
      setShowControls(false);
    }
  }, [products, itemsPerPage]);

  const handlePrev = () => {
    setCurrentIndex(prev => (prev > 0 ? prev - 1 : 0));
  };

  const handleNext = () => {
    if (products) {
      setCurrentIndex(prev => 
        prev < products.length - itemsPerPage ? prev + 1 : prev
      );
    }
  };

  if (isLoading) {
    return (
      <div className="py-16 bg-slate-50 dark:bg-slate-950">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-pulse">
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-48 mx-auto mb-3"></div>
            <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded w-64 mx-auto mb-4"></div>
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded max-w-md mx-auto mb-12"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="h-80 bg-slate-200 dark:bg-slate-800 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !products) {
    return (
      <div className="py-16 bg-slate-50 dark:bg-slate-950">
        <div className="container mx-auto px-4 text-center">
          <p className="text-red-500">Error al cargar los productos destacados</p>
        </div>
      </div>
    );
  }

  return (
    <section className="py-16 bg-slate-50 dark:bg-slate-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="outline" className="border-blue-200 text-blue-600 dark:border-blue-900 dark:text-blue-400 mb-3">
            PRODUCTOS DESTACADOS
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Los favoritos de nuestros clientes
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Descubre los productos más queridos por la comunidad felina.
            Seleccionados por su calidad y valoración excepcional.
          </p>
        </div>

        <div className="relative w-full">
          <div 
            ref={sliderRef} 
            className="overflow-hidden w-full"
          >
            <div 
              className="flex transition-transform duration-300 ease-out"
              style={{ 
                transform: `translateX(-${currentIndex * itemWidth}px)`,
                width: products.length * itemWidth + 'px'
              }}
            >
              {products.map(product => (
                <div 
                  key={product.id} 
                  className="px-3"
                  style={{ width: itemWidth + 'px' }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>

          {showControls && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className={`absolute top-1/2 -translate-y-1/2 -left-4 h-10 w-10 rounded-full bg-white/80 dark:bg-slate-800/80 shadow-md z-10 ${
                  currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                onClick={handlePrev}
                disabled={currentIndex === 0}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                className={`absolute top-1/2 -translate-y-1/2 -right-4 h-10 w-10 rounded-full bg-white/80 dark:bg-slate-800/80 shadow-md z-10 ${
                  currentIndex >= products.length - itemsPerPage ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                onClick={handleNext}
                disabled={currentIndex >= products.length - itemsPerPage}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </>
          )}
        </div>

        <div className="text-center mt-12">
          <Button asChild variant="outline" className="rounded-full">
            <Link to="/productos">
              Ver todos los productos
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}