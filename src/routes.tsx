import { lazy, Suspense, useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { LoadingScreen } from '@/components/shared/loading-screen';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Componente para manejar errores de carga
const ErrorBoundary = ({ children }: { children: React.ReactNode }) => {
  const [hasError, setHasError] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setHasError(false);
  }, [location.pathname]);

  if (hasError) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <Alert variant="destructive" className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error al cargar la página</AlertTitle>
          <AlertDescription className="mt-2">
            <p className="mb-4">Ha ocurrido un error al cargar esta página. Por favor, intenta nuevamente.</p>
            <Button 
              onClick={() => window.location.reload()} 
              variant="outline"
              className="mr-2"
            >
              Reintentar
            </Button>
            <Button onClick={() => window.location.href = "/"}>
              Volver al inicio
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  try {
    return <>{children}</>;
  } catch (error) {
    setHasError(true);
    return null;
  }
};

// Configuración avanzada para lazy loading con retry
const lazyLoadWithRetry = (importFn: () => Promise<any>, retries = 2) => {
  return lazy(async () => {
    let lastError: any;
    
    for (let i = 0; i <= retries; i++) {
      try {
        return await importFn();
      } catch (err) {
        lastError = err;
        if (i < retries) {
          // Esperar brevemente antes de reintentar
          await new Promise(resolve => setTimeout(resolve, 500));
        }
      }
    }
    
    // Mensaje útil en consola para diagnóstico
    console.error('Error al cargar módulo después de varios intentos:', lastError);
    throw lastError;
  });
};

// Lazy load components con retry
const Home = lazyLoadWithRetry(() => import('@/pages/home'));
const ProductList = lazyLoadWithRetry(() => import('@/pages/product-list'));
const ProductDetail = lazyLoadWithRetry(() => import('@/pages/product-detail'));
const Cart = lazyLoadWithRetry(() => import('@/pages/cart'));
const Login = lazyLoadWithRetry(() => import('@/pages/login'));
const Register = lazyLoadWithRetry(() => import('@/pages/register'));
const Checkout = lazyLoadWithRetry(() => import('@/pages/checkout'));
//const Admin = lazyLoadWithRetry(() => import('@/pages/admin'));
//const AdminProducts = lazyLoadWithRetry(() => import('@/pages/admin/products'));
//const AdminOrders = lazyLoadWithRetry(() => import('@/pages/admin/orders'));
//const AdminDashboard = lazyLoadWithRetry(() => import('@/pages/admin/dashboard'));
//const NotFound = lazyLoadWithRetry(() => import('@/pages/not-found'));

export function AppRoutes() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<ProductList />} />
          <Route path="/productos/:id" element={<ProductDetail />} />
          <Route path="/carrito" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Register />} />
          <Route path="/checkout" element={<Checkout />} />
          {/*<Route path="/admin" element={<Admin />}>
            <Route index element={<AdminDashboard />} />
            <Route path="productos" element={<AdminProducts />} />
            <Route path="pedidos" element={<AdminOrders />} />
          </Route>
          <Route path="*" element={<NotFound />} />*/}
          <Route path="*" element={
            <div className="container mx-auto px-4 py-16 text-center">
              <h1 className="text-3xl font-bold mb-4">Página no encontrada</h1>
              <p className="mb-8">Lo sentimos, la página que buscas no existe.</p>
              <Button asChild>
                <a href="/">Volver al inicio</a>
              </Button>
            </div>
          } />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}