import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@/components/theme/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { AppRoutes } from '@/routes';
import { CartProvider } from '@/context/cart-context';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { useEffect, useState } from 'react';
import { Cat } from 'lucide-react';
import './App.css';

// Componente para manejar errores a nivel global
function ErrorFallback() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-100 dark:bg-slate-900 p-4 text-center">
      <Cat className="h-16 w-16 text-red-500 mb-4" />
      <h1 className="text-2xl font-bold mb-2">¡Ups! Algo salió mal</h1>
      <p className="mb-6 max-w-md text-slate-600 dark:text-slate-400">
        Ha ocurrido un error inesperado en la aplicación. Intenta recargar la página.
      </p>
      <button
        onClick={() => window.location.reload()}
        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
      >
        Reiniciar aplicación
      </button>
    </div>
  );
}

function App() {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Manejo de errores global
  useEffect(() => {
    const handleError = () => {
      setHasError(true);
      console.error("Se detectó un error global en la aplicación");
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleError);

    // Simulamos una carga inicial para garantizar que los recursos estén listos
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleError);
      clearTimeout(timer);
    };
  }, []);

  // Pantalla inicial de carga
  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-background-accent to-background dark:from-background-secondary dark:to-background">
        <div className="text-center">
          <Cat className="h-12 w-12 text-primary mx-auto animate-bounce" />
          <p className="mt-4 text-slate-700 dark:text-slate-300">Iniciando CatCommerce...</p>
        </div>
      </div>
    );
  }

  // Si hay un error global, mostrar pantalla de error
  if (hasError) {
    return <ErrorFallback />;
  }

  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="light">
        <CartProvider>
          <div className="min-h-screen flex flex-col bg-gradient-to-b from-background-accent to-background dark:from-background-secondary dark:to-background">
            <Header />
            <main className="flex-grow">
              <AppRoutes />
            </main>
            <Footer />
            <Toaster position="top-right" richColors closeButton />
          </div>
        </CartProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;