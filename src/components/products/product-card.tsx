import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star, PawPrint as Paw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Product } from '@/types/product';
import { useCart } from '@/context/cart-context';
import { formatCurrency } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    
    // Simulate a small delay for animation
    setTimeout(() => {
      addToCart(product);
      setIsAdding(false);
    }, 300);
  };

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsFavorite(!isFavorite);
  };

  return (
    <motion.div
      className="relative glassmorphism overflow-hidden rounded-xl card-hover h-full"
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Link to={`/productos/${product.id}`} className="block h-full">
        <div className="relative pt-[100%] overflow-hidden">
          {product.discount > 0 && (
            <Badge className="absolute top-3 left-3 z-20 bg-red-500 hover:bg-red-600">
              -{product.discount}%
            </Badge>
          )}
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant={isFavorite ? "default" : "ghost"}
                  className={`absolute top-3 right-3 z-20 h-8 w-8 rounded-full ${
                    isFavorite ? 'bg-red-500 hover:bg-red-600' : 'bg-white/80 dark:bg-slate-800/80'
                  }`}
                  onClick={toggleFavorite}
                >
                  <Heart className={`h-4 w-4 ${isFavorite ? 'fill-white text-white' : ''}`} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>{isFavorite ? 'Eliminar de favoritos' : 'Añadir a favoritos'}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <motion.img
            src={product.images[0]}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ scale: 1 }}
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.3 }}
          />
          
          <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}></div>
          
          <div className={`absolute bottom-0 left-0 right-0 p-4 transition-transform duration-300 ${
            isHovered ? 'translate-y-0' : 'translate-y-full'
          }`}>
            <div className="flex justify-between items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <div className="flex">
                  {[...Array(5)].map((_, index) => (
                    <Star
                      key={index}
                      className={`h-4 w-4 ${
                        index < product.rating
                          ? 'text-yellow-500 fill-yellow-500'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-xs text-white mt-1">{product.reviewCount} reseñas</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.8 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        size="icon"
                        onClick={(e) => {
                          e.preventDefault();
                          handleAddToCart();
                        }}
                        className={`h-10 w-10 rounded-full ${
                          isAdding ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                      >
                        {isAdding ? (
                          <Paw className="h-5 w-5 animate-bounce" />
                        ) : (
                          <ShoppingCart className="h-5 w-5" />
                        )}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Añadir al carrito</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </motion.div>
            </div>
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="font-medium text-lg line-clamp-1 mb-1">{product.name}</h3>
          
          <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-2 mb-2">
            {product.description}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {product.discount > 0 ? (
                <>
                  <span className="font-medium text-lg text-blue-600 dark:text-blue-400">
                    {formatCurrency(product.price * (1 - product.discount / 100))}
                  </span>
                  <span className="ml-2 text-sm line-through text-slate-500">
                    {formatCurrency(product.price)}
                  </span>
                </>
              ) : (
                <span className="font-medium text-lg text-blue-600 dark:text-blue-400">
                  {formatCurrency(product.price)}
                </span>
              )}
            </div>
            
            {product.stock > 0 ? (
              <Badge variant="outline" className="text-xs border-green-200 text-green-600 dark:border-green-900 dark:text-green-400">
                En stock
              </Badge>
            ) : (
              <Badge variant="outline" className="text-xs border-red-200 text-red-600 dark:border-red-900 dark:text-red-400">
                Agotado
              </Badge>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}