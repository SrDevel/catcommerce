import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  ShoppingCart, 
  Heart, 
  ChevronLeft, 
  Star 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { products } from '@/data/products';
import { Product } from '@/types/product';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCart } from '@/context/cart-context';
import { formatCurrency } from '@/lib/utils';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    setLoading(true);
    const foundProduct = products.find(p => p.id === id);
    
    setTimeout(() => {
      setProduct(foundProduct || null);
      setLoading(false);
    }, 500);
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      setIsAdding(true);
      addToCart(product, quantity);
      setTimeout(() => {
        setIsAdding(false);
        navigate('/carrito');
      }, 500);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto py-10">
        <div className="animate-pulse">
          <div className="h-8 w-1/3 bg-gray-200 rounded mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="h-96 bg-gray-200 rounded"></div>
            <div className="space-y-4">
              <div className="h-10 bg-gray-200 rounded w-3/4"></div>
              <div className="h-6 bg-gray-200 rounded w-1/4"></div>
              <div className="h-32 bg-gray-200 rounded"></div>
              <div className="h-12 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto py-10 text-center">
        <h1 className="text-3xl font-bold mb-4">Producto no encontrado</h1>
        <p className="mb-6">Lo sentimos, no pudimos encontrar el producto que estás buscando.</p>
        <Button onClick={() => navigate('/productos')}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Volver a la lista de productos
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <Button 
        variant="ghost" 
        className="mb-6"
        onClick={() => navigate('/productos')}
      >
        <ChevronLeft className="mr-2 h-4 w-4" />
        Volver a productos
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <div className="rounded-lg overflow-hidden bg-white">
          <img 
            src={product.images[0]} 
            alt={product.name} 
            className="w-full h-auto object-cover aspect-square"
          />
        </div>

        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold">{product.name}</h1>
              <Button variant="outline" size="icon">
                <Heart className="h-5 w-5" />
              </Button>
            </div>
            <div className="flex items-center mt-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star 
                  key={star} 
                  className={`h-4 w-4 ${star <= 4 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                />
              ))}
              <span className="ml-2 text-sm text-gray-500">
                4.0 (24 reseñas)
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-3xl font-bold">
              {formatCurrency(product.price * (1 - product.discount / 100))}
            </span>
            {product.discount > 0 && (
              <>
                <span className="text-xl text-gray-500 line-through">
                  {formatCurrency(product.price)}
                </span>
                <Badge variant="destructive">-{product.discount}%</Badge>
              </>
            )}
          </div>

          <Separator />

          <div>
            <h3 className="font-medium mb-2">Descripción</h3>
            <p className="text-gray-600">{product.description || 'No hay descripción disponible para este producto.'}</p>
          </div>

          <Separator />

          <div className="flex items-center space-x-4">
            <div className="flex items-center border rounded-md">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-10 rounded-none" 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={isAdding}
              >
                -
              </Button>
              <span className="w-10 text-center">{quantity}</span>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-10 rounded-none" 
                onClick={() => setQuantity(quantity + 1)}
                disabled={isAdding}
              >
                +
              </Button>
            </div>

            <Button 
              className="flex-1" 
              onClick={handleAddToCart}
              disabled={isAdding || product.stock === 0}
            >
              {isAdding ? (
                "Agregando..."
              ) : product.stock === 0 ? (
                "Agotado"
              ) : (
                <>
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Agregar al carrito
                </>
              )}
            </Button>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-600 space-y-2">
            <p className="flex items-center">
              <span className="font-medium mr-2">SKU:</span> 
              {product.id}
            </p>
            <p className="flex items-center">
              <span className="font-medium mr-2">Categoría:</span> 
              {product.category}
            </p>
            <p className="flex items-center">
              <span className="font-medium mr-2">Disponibilidad:</span> 
              En stock
            </p>
          </div>
        </div>
      </div>

      <Tabs defaultValue="details" className="mt-8">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="details">Detalles</TabsTrigger>
          <TabsTrigger value="specs">Especificaciones</TabsTrigger>
          <TabsTrigger value="reviews">Reseñas</TabsTrigger>
        </TabsList>
        <TabsContent value="details" className="p-4">
          <Card>
            <CardContent className="pt-6">
              <p>Información detallada del producto aquí.</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="specs" className="p-4">
          <Card>
            <CardContent className="pt-6">
              <ul className="space-y-2">
                <li className="flex border-b pb-2">
                  <span className="font-medium w-40">Material:</span>
                  <span>Premium</span>
                </li>
                <li className="flex border-b pb-2">
                  <span className="font-medium w-40">Dimensiones:</span>
                  <span>Estándar</span>
                </li>
                <li className="flex border-b pb-2">
                  <span className="font-medium w-40">Peso:</span>
                  <span>0.5 kg</span>
                </li>
                <li className="flex border-b pb-2">
                  <span className="font-medium w-40">Garantía:</span>
                  <span>1 año</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reviews" className="p-4">
          <Card>
            <CardContent className="pt-6">
              <p>Las reseñas de usuarios aparecerán aquí.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}