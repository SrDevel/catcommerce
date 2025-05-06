import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Cat,
  ShoppingBag,
  Menu,
  X,
  Search,
  Heart,
  User,
  ChevronDown,
  LogIn,
  UserPlus
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
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';

export function Header() {
  const { cartItems } = useCart();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const closeCartTimeout = useRef<NodeJS.Timeout>();

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

  const handleCartEnter = () => {
    if (closeCartTimeout.current) {
      clearTimeout(closeCartTimeout.current);
    }
    setIsCartOpen(true);
  };

  const handleCartLeave = () => {
    closeCartTimeout.current = setTimeout(() => {
      setIsCartOpen(false);
    }, 300);
  };

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
            <Cat className="h-7 w-7 text-primary" />
            <span className="font-bold text-xl text-primary">CatCommerce</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link to="/" className="px-3 py-2 text-sm font-medium text-primary hover:text-primary/90">
              Inicio
            </Link>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="px-3 py-2 text-sm font-medium text-primary hover:text-primary/90 flex items-center gap-1">
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

            <Link to="/productos" className="px-3 py-2 text-sm font-medium text-primary hover:text-primary/90">
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
              <Search className="absolute right-2.5 top-2.5 h-5 w-5 text-muted-foreground" />
            </form>
            
            <ThemeToggle />
            
            <div className="relative"
                 onMouseEnter={handleCartEnter}
                 onMouseLeave={handleCartLeave}>
              <Button variant="ghost" size="icon" className="rounded-full" asChild>
                <Link to="/carrito">
                  <ShoppingBag className="h-6 w-6 text-primary" />
                  {totalItems > 0 && (
                    <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                      {totalItems}
                    </Badge>
                  )}
                </Link>
              </Button>
              <CartPreview isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
            </div>
            
            {/* Icono de favoritos con el mismo estilo que el carrito */}
            <Button variant="ghost" size="icon" className="rounded-full hidden md:flex" asChild>
              <Link to="/favoritos">
                <Heart className="h-6 w-6 text-primary" />
              </Link>
            </Button>
            
            {/* Dropdown de usuario con opciones de login/registro - Corregido para tema oscuro */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full hidden md:flex items-center justify-center">
                  <div className="text-primary">
                    <User className="h-6 w-6" />
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52">
                <DropdownMenuItem asChild>
                  <Link to="/login" className="w-full flex items-center gap-2">
                    <LogIn className="h-4 w-4" />
                    <span>Iniciar sesión</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/register" className="w-full flex items-center gap-2">
                    <UserPlus className="h-4 w-4" />
                    <span>Crear cuenta</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-primary" />
              ) : (
                <Menu className="h-6 w-6 text-primary" />
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
            <Search className="absolute right-2.5 top-2.5 h-5 w-5 text-muted-foreground" />
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
                    className="block px-3 py-1 text-sm rounded-md hover:bg-accent hover:text-accent-foreground"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>
            <Link to="/productos" className="px-3 py-2 text-sm font-medium">
              Productos
            </Link>
            <Link to="/carrito" className="px-3 py-2 text-sm font-medium flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-primary" />
              Carrito
              {totalItems > 0 && (
                <Badge variant="destructive" className="ml-auto">
                  {totalItems}
                </Badge>
              )}
            </Link>
            <Link to="/favoritos" className="px-3 py-2 text-sm font-medium flex items-center gap-2">
              <Heart className="h-5 w-5 text-primary" />
              Favoritos
            </Link>
            <div className="border-t border-border pt-2 mt-2">
              <Link to="/login" className="px-3 py-2 text-sm font-medium flex items-center gap-2">
                <LogIn className="h-5 w-5 text-primary" />
                Iniciar sesión
              </Link>
              <Link to="/register" className="px-3 py-2 text-sm font-medium flex items-center gap-2">
                <UserPlus className="h-5 w-5 text-primary" />
                Crear cuenta
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}