import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingCart, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/context/cart-context';
import { formatCurrency } from '@/lib/utils';

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, clearCart, getTotalPrice } = useCart();
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdateQuantity = (id: string, quantity: number) => {
    setIsUpdating(true);
    updateQuantity(id, quantity);
    setTimeout(() => setIsUpdating(false), 300);
  };

  const subtotal = getTotalPrice();
  const shipping = subtotal > 50 ? 0 : 4.99;
  const total = subtotal + shipping;

  if (cartItems.length === 0) {
    return (
      <>
        <Helmet>
          <title>Carrito vacío | CatCommerce</title>
        </Helmet>
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-lg mx-auto text-center">
            <ShoppingCart className="h-16 w-16 mx-auto mb-6 text-muted-foreground" />
            <h1 className="text-2xl font-bold mb-4">Tu carrito está vacío</h1>
            <p className="text-muted-foreground mb-8">
              Parece que aún no has agregado ningún producto a tu carrito.
            </p>
            <Button asChild size="lg">
              <Link to="/productos">Ver productos</Link>
            </Button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Carrito de compras | CatCommerce</title>
      </Helmet>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="container mx-auto px-4 py-8"
      >
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold">Carrito de compras</h1>
            <Button
              variant="ghost"
              className="text-red-500 hover:text-red-600 hover:bg-red-50"
              onClick={clearCart}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Vaciar carrito
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    className="flex items-center space-x-4 p-4 bg-white dark:bg-slate-900 rounded-lg shadow-sm"
                  >
                    <div className="h-20 w-20 flex-shrink-0 rounded-md overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-grow">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-blue-600 dark:text-blue-400 font-medium mt-1">
                        {formatCurrency(item.price)}
                      </p>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="flex items-center border rounded-md">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1 || isUpdating}
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => {
                            const value = parseInt(e.target.value);
                            if (!isNaN(value) && value > 0) {
                              handleUpdateQuantity(item.id, value);
                            }
                          }}
                          className="w-12 h-8 text-center border-0"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                          disabled={isUpdating}
                        >
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8">
                <Button
                  variant="outline"
                  asChild
                  className="flex items-center"
                >
                  <Link to="/productos">
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    Seguir comprando
                  </Link>
                </Button>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-slate-900 rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-medium mb-4">Resumen del pedido</h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">{formatCurrency(subtotal)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Envío</span>
                    <span className="font-medium">
                      {shipping === 0 ? 'Gratis' : formatCurrency(shipping)}
                    </span>
                  </div>

                  <Separator />
                  
                  <div className="flex justify-between text-lg">
                    <span className="font-medium">Total</span>
                    <span className="font-bold">{formatCurrency(total)}</span>
                  </div>

                  {shipping > 0 && (
                    <p className="text-sm text-muted-foreground">
                      ¡Agrega {formatCurrency(50 - subtotal)} más para obtener envío gratis!
                    </p>
                  )}

                  <Button className="w-full" size="lg">
                    Proceder al pago
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}