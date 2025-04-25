import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { LoadingScreen } from '@/components/shared/loading-screen';

// Lazy load components for better performance
const Home = lazy(() => import('@/pages/home'));
const ProductList = lazy(() => import('@/pages/product-list'));
const ProductDetail = lazy(() => import('@/pages/product-detail'));
//const Cart = lazy(() => import('@/pages/
//const Checkout = lazy(() => import('@/pages/checkout'));
//const Admin = lazy(() => import('@/pages/admin'));
// AdminProducts = lazy(() => import('@/pages/admin/products'));
//const AdminOrders = lazy(() => import('@/pages/admin/orders'));
//const AdminDashboard = lazy(() => import('@/pages/admin/dashboard'));
//const NotFound = lazy(() => import('@/pages/not-found'));

export function AppRoutes() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<ProductList />} />
        <Route path="/productos/:id" element={<ProductDetail />} />
        {/*<Route path="/carrito" element={<Cart />} />*/}
        {/*<Route path="/checkout" element={<Checkout />} />*/}
        {/*<Route path="/admin" element={<Admin />}>
          <Route index element={<AdminDashboard />} />
          <Route path="productos" element={<AdminProducts />} />
          <Route path="pedidos" element={<AdminOrders />} />
        </Route>
        <Route path="*" element={<NotFound />} />*/}
      </Routes>
    </Suspense>
  );
}