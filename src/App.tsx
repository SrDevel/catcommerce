import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@/components/theme/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { AppRoutes } from '@/routes';
import { CartProvider } from '@/context/cart-context';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="light">
        <CartProvider>
          <div className="min-h-screen flex flex-col bg-gradient-to-b from-background-accent to-background-primary dark:from-background-secondary dark:to-background-primary">
            <Header />
            <main className="flex-grow">
              <AppRoutes />
            </main>
            <Footer />
            <Toaster />
          </div>
        </CartProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;