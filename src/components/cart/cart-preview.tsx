import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, X, ChevronRight } from 'lucide-react';
import { useCart } from '@/context/cart-context';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { formatCurrency } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface CartPreviewProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartPreview({ isOpen, onClose }: CartPreviewProps) {
  const { cartItems, removeFromCart, getTotalPrice } = useCart();
  const previewRef = useRef<HTMLDivElement>(null);
  const closeCartTimeout = useRef<NodeJS.Timeout | null>(null);

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (previewRef.current && !previewRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (cartItems.length === 0 && isOpen) {
    return (
      <div 
        ref={previewRef}
        className="absolute top-16 right-0 w-80 rounded-lg shadow-lg p-4 glassmorphism"
      >
        <div className="flex flex-col items-center py-8 text-center">
          <ShoppingBag className="h-12 w-12 text-muted-foreground mb-3" />
          <p className="text-lg font-medium mb-1">Tu carrito está vacío</p>
          <p className="text-sm text-muted-foreground mb-4">¡Agrega algunos productos!</p>
          <Button onClick={onClose} asChild>
            <Link to="/productos" className="flex items-center">
              Ver productos <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  if (!isOpen) return null;

  return (
    <div 
      ref={previewRef}
      onMouseEnter={() => closeCartTimeout.current && clearTimeout(closeCartTimeout.current)}
      onMouseLeave={() => setTimeout(onClose, 300)}
      className="absolute top-16 right-0 w-80 rounded-lg shadow-lg overflow-hidden z-50 bg-background border"
    >
      <div className="p-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-medium">Tu Carrito</h3>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <Separator />
        
        <div className="max-h-64 overflow-y-auto py-2">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center py-2">
              <div className="h-14 w-14 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="h-full w-full object-cover"
                />
              </div>
              
              <div className="ml-3 flex-grow">
                <p className="text-sm font-medium line-clamp-1">{item.name}</p>
                <div className="flex justify-between items-center mt-1">
                  <div className="flex items-center">
                    <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                      {formatCurrency(item.price)}
                    </span>
                    <span className="mx-1 text-muted-foreground">×</span>
                    <span className="text-sm">{item.quantity}</span>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 rounded-full"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <Separator className="mt-2" />
        
        <div className="py-3">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-muted-foreground">Subtotal</span>
            <span className="text-sm font-medium">{formatCurrency(getTotalPrice())}</span>
          </div>
          
          <div className="flex justify-between mb-4">
            <span className="text-sm text-muted-foreground">Productos</span>
            <Badge variant="outline" className="text-xs">
              {totalItems} {totalItems === 1 ? 'artículo' : 'artículos'}
            </Badge>
          </div>
          
          <div className="flex space-x-2">
            <Button asChild variant="outline" className="flex-1">
              <Link to="/carrito">Ver carrito</Link>
            </Button>
            <Button asChild className="flex-1">
              <Link to="/checkout">Checkout</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}