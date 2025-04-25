import { Cat } from 'lucide-react';

export function LoadingScreen() {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center">
      <Cat className="h-12 w-12 text-blue-600 dark:text-blue-400 animate-bounce" />
      <div className="mt-4 flex space-x-2 paw-loading">
        <div className="h-3 w-3 rounded-full bg-blue-600 dark:bg-blue-400"></div>
        <div className="h-3 w-3 rounded-full bg-blue-600 dark:bg-blue-400"></div>
        <div className="h-3 w-3 rounded-full bg-blue-600 dark:bg-blue-400"></div>
        <div className="h-3 w-3 rounded-full bg-blue-600 dark:bg-blue-400"></div>
      </div>
      <p className="mt-4 text-slate-600 dark:text-slate-400">Cargando...</p>
    </div>
  );
}