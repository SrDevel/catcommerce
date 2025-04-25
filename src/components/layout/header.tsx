import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Cat, ShoppingBag, Menu, X, Search, 
  HeartIcon, User, ChevronDown 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme/theme-toggle';
import { CartPreview } from '@/components/cart/cart-preview';
import { useCart } from '@/context/cart-context';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';

export function Header() {
  const { cartItems } = useCart();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Change header style on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when changing routes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const categories = [
    { name: 'Alimentos', path: '/productos?categoria=alimentos' },
    { name: 'Juguetes', path: '/productos?categoria=juguetes' },
    { name: 'Accesorios', path: '/productos?categoria=accesorios' },
    { name: 'Camas', path: '/productos?categoria=camas' },
    { name: 'Higiene', path: '/productos?categoria=higiene' }
  ];

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg shadow-sm' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Cat className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            <span className="font-bold text-xl text-slate-900 dark:text-white">CatCommerce</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link to="/" className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-blue-600 dark:text-slate-200 dark:hover:text-blue-400">
              Inicio
            </Link>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="px-3 py-2 text-sm font-medium text-foreground hover:text-blue-600 dark:text-slate-200 dark:hover:text-blue-400 flex items-center gap-1">
                  Categorías <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {categories.map((category) => (
                  <DropdownMenuItem key={category.path} asChild>
                    <Link to={category.path}>{category.name}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Link to="/productos" className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-blue-600 dark:text-slate-200 dark:hover:text-blue-400">
              Productos
            </Link>
          </nav>

          {/* Search, Theme, Cart, and Mobile Menu */}
          <div className="flex items-center space-x-2">
            <form className="hidden md:flex relative">
              <Input
                type="search"
                placeholder="Buscar productos..."
                className="w-[180px] lg:w-[260px] pr-8 rounded-full"
              />
              <Search className="absolute right-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            </form>
            
            <ThemeToggle />
            
            <Link to="/carrito" className="relative">
              <Button variant="ghost" size="icon" className="rounded-full">
                <ShoppingBag className="h-5 w-5" />
                {totalItems > 0 && (
                  <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                    {totalItems}
                  </Badge>
                )}
              </Button>
              <CartPreview />
            </Link>
            
            <Button variant="ghost" size="icon" className="rounded-full md:flex hidden">
              <HeartIcon className="h-5 w-5" />
            </Button>
            
            <Button variant="ghost" size="icon" className="rounded-full md:flex hidden">
              <User className="h-5 w-5" />
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden glassmorphism mx-4 mt-2 p-4 z-50">
          <form className="relative mb-4">
            <Input
              type="search"
              placeholder="Buscar productos..."
              className="w-full pr-8 rounded-full"
            />
            <Search className="absolute right-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          </form>
          
          <nav className="flex flex-col space-y-3">
            <Link to="/" className="px-3 py-2 text-sm font-medium">
              Inicio
            </Link>
            <div className="px-3 py-2 text-sm font-medium">
              <div className="flex justify-between items-center">
                <span>Categorías</span>
              </div>
              <div className="ml-3 mt-2 space-y-1">
                {categories.map((category) => (
                  <Link 
                    key={category.path} 
                    to={category.path}
                    className="block px-3 py-1 text-sm rounded-md hover:bg-blue-100 dark:hover:bg-blue-900/20"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>
            <Link to="/productos" className="px-3 py-2 text-sm font-medium">
              Productos
            </Link>
            <Link to="/carrito" className="px-3 py-2 text-sm font-medium">
              Carrito
            </Link>
            <Link to="#" className="px-3 py-2 text-sm font-medium">
              Favoritos
            </Link>
            <Link to="#" className="px-3 py-2 text-sm font-medium">
              Mi Cuenta
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}