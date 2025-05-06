import { Cat } from 'lucide-react';
import { useEffect, useState } from 'react';

export function LoadingScreen({ timeout = 5000 }: { timeout?: number }) {
  const [isLongLoad, setIsLongLoad] = useState(false);
  
  // Si la carga toma más de 'timeout' ms, mostrar un mensaje diferente
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLongLoad(true);
    }, timeout);
    
    return () => clearTimeout(timer);
  }, [timeout]);
  
  return (
    <div className="min-h-[80vh] w-full flex flex-col items-center justify-center p-4">
      <div className="text-center">
        <Cat className="h-12 w-12 mx-auto text-primary animate-bounce" />
        <div className="mt-4 flex space-x-2 justify-center">
          {[...Array(4)].map((_, i) => (
            <div 
              key={i}
              className="h-3 w-3 rounded-full bg-primary/80 animate-pulse" 
              style={{ 
                animationDelay: `${i * 0.15}s`,
                opacity: 0.6 + (i * 0.1)
              }}
            ></div>
          ))}
        </div>
        <p className="mt-4 text-slate-600 dark:text-slate-400 font-medium">
          {isLongLoad ? "Esto está tardando más de lo esperado..." : "Cargando..."}
        </p>
        
        {isLongLoad && (
          <div className="mt-4 max-w-xs mx-auto">
            <p className="text-sm text-slate-500 dark:text-slate-500">
              Es posible que estemos experimentando algún problema. Puedes intentar recargar la página.
            </p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-3 px-4 py-2 text-sm bg-primary/90 hover:bg-primary text-white rounded-md transition-colors"
            >
              Recargar página
            </button>
          </div>
        )}
      </div>
    </div>
  );
}