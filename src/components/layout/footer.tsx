import { Link } from 'react-router-dom';
import { 
  Cat,
  Heart,
  Mail,
  MapPin,
  Phone,
  Facebook,
  Instagram,
  Twitter,
  Youtube
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function Footer() {
  return (
    <footer className="bg-slate-100 dark:bg-slate-900 pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Cat className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              <span className="font-bold text-xl text-slate-900 dark:text-white">CatCommerce</span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              La tienda online especializada en productos para tu felino favorito.
              Calidad y variedad para que tu gato tenga lo mejor.
            </p>
            <div className="flex space-x-3">
              <Button variant="outline" size="icon" className="rounded-full">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Button>
              <Button variant="outline" size="icon" className="rounded-full">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Button>
              <Button variant="outline" size="icon" className="rounded-full">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Button>
              <Button variant="outline" size="icon" className="rounded-full">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-medium text-lg text-slate-900 dark:text-white">Enlaces Rápidos</h3>
            <nav className="flex flex-col space-y-2">
              <Link to="/" className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 text-sm">
                Inicio
              </Link>
              <Link to="/productos" className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 text-sm">
                Productos
              </Link>
              <Link to="#" className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 text-sm">
                Sobre Nosotros
              </Link>
              <Link to="#" className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 text-sm">
                Blog Felino
              </Link>
              <Link to="#" className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 text-sm">
                Contacto
              </Link>
              <Link to="#" className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 text-sm">
                Política de Privacidad
              </Link>
              <Link to="#" className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 text-sm">
                Términos y Condiciones
              </Link>
            </nav>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="font-medium text-lg text-slate-900 dark:text-white">Categorías</h3>
            <nav className="flex flex-col space-y-2">
              <Link to="/productos?categoria=alimentos" className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 text-sm">
                Alimentos
              </Link>
              <Link to="/productos?categoria=juguetes" className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 text-sm">
                Juguetes
              </Link>
              <Link to="/productos?categoria=accesorios" className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 text-sm">
                Accesorios
              </Link>
              <Link to="/productos?categoria=camas" className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 text-sm">
                Camas
              </Link>
              <Link to="/productos?categoria=higiene" className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 text-sm">
                Higiene
              </Link>
              <Link to="/productos?categoria=salud" className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 text-sm">
                Salud y Bienestar
              </Link>
              <Link to="/productos?categoria=rascadores" className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 text-sm">
                Rascadores
              </Link>
            </nav>
          </div>

          {/* Newsletter & Contact */}
          <div className="space-y-4">
            <h3 className="font-medium text-lg text-slate-900 dark:text-white">Mantente Informado</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              Suscríbete para recibir novedades, ofertas exclusivas y consejos para el cuidado de tu gato.
            </p>
            <div className="flex space-x-2">
              <Input 
                type="email" 
                placeholder="Tu correo electrónico" 
                className="rounded-full"
              />
              <Button variant="default" className="rounded-full">
                Suscribir
              </Button>
            </div>
            <div className="pt-4 space-y-2">
              <div className="flex items-center space-x-3 text-slate-600 dark:text-slate-400 text-sm">
                <MapPin className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <span>Calle Felina 123, Ciudad Gatuna</span>
              </div>
              <div className="flex items-center space-x-3 text-slate-600 dark:text-slate-400 text-sm">
                <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <span>contacto@catcommerce.com</span>
              </div>
              <div className="flex items-center space-x-3 text-slate-600 dark:text-slate-400 text-sm">
                <Phone className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <span>+34 900 123 456</span>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-6" />

        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            © 2025 CatCommerce. Todos los derechos reservados.
          </p>
          <div className="flex items-center space-x-2">
            <Heart className="h-5 w-5 text-red-500" />
            <span className="text-slate-600 dark:text-slate-400 text-sm">
              Hecho con amor para gatos y sus humanos
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}