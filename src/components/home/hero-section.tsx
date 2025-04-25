import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MoveRight, ShoppingBag, Heart, Search } from 'lucide-react';

export function HeroSection() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const parallaxValue = -scrollY * 0.15;

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-16 lg:pb-24">
      {/* Background gradient with clip path */}
      <div className="absolute inset-0 hero-gradient -z-10 opacity-90"></div>
      
      {/* Animated paw prints */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {[...Array(10)].map((_, index) => (
          <motion.div
            key={index}
            className="absolute text-foreground/10"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 40 + 20}px`,
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.1, scale: 1 }}
            transition={{ 
              delay: index * 0.2, 
              duration: 0.5, 
              repeat: Infinity, 
              repeatType: 'reverse', 
              repeatDelay: Math.random() * 10 + 5 
            }}
          >
            🐾
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16">
          {/* Content */}
          <motion.div 
            className="flex-1 text-center lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight text-foreground">
              Productos de Calidad para tu Felino Favorito
            </h1>
            <p className="text-lg md:text-xl mb-8 max-w-lg mx-auto lg:mx-0 text-muted-foreground">
              Todo lo que tu gato necesita para una vida feliz y saludable en un solo lugar.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
              <Button asChild size="lg" className="rounded-full text-md">
                <Link to="/productos" className="group">
                  Comprar ahora 
                  <MoveRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full text-md">
                <Link to="#cat-quiz">
                  Descubrir productos
                </Link>
              </Button>
            </div>
            
            <div className="mt-8 flex justify-center lg:justify-start space-x-6">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <ShoppingBag className="h-5 w-5" />
                <span className="text-sm font-medium">Envío Gratis</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Heart className="h-5 w-5" />
                <span className="text-sm font-medium">Garantía</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Search className="h-5 w-5" />
                <span className="text-sm font-medium">Soporte 24/7</span>
              </div>
            </div>
          </motion.div>
          
          {/* Hero Image with Parallax Effect */}
          <motion.div 
            className="flex-1 relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{ y: parallaxValue }}
          >
            <div className="relative">
              <div className="absolute -inset-4 rounded-full bg-accent/20 blur-3xl"></div>
              <img 
                src="https://images.pexels.com/photos/320014/pexels-photo-320014.jpeg" 
                alt="Gato jugando con juguete" 
                className="relative z-10 rounded-3xl shadow-2xl max-w-full"
              />
              
              {/* Floating product cards */}
              <motion.div
                className="absolute -left-16 -bottom-8 md:-left-24 md:-bottom-12 z-20 glassmorphism p-3 w-44 rounded-xl shadow-lg float"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                whileHover={{ y: -5 }}
              >
                <div className="relative bg-background rounded-lg overflow-hidden h-24">
                  <img 
                    src="https://images.pexels.com/photos/1031251/pexels-photo-1031251.jpeg" 
                    alt="Juguete para gatos" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="mt-2">
                  <h3 className="text-xs font-medium text-card-foreground">Juguetes premium</h3>
                  <p className="text-[11px] text-muted-foreground">Diversión gatuna</p>
                </div>
              </motion.div>
              
              <motion.div
                className="absolute -right-16 top-12 md:-right-24 md:top-16 z-20 glassmorphism p-3 w-44 rounded-xl shadow-lg float"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                whileHover={{ y: -5 }}
                style={{animationDelay: '0.5s'}}
              >
                <div className="relative bg-background rounded-lg overflow-hidden h-24">
                  <img 
                    src="https://images.pexels.com/photos/6957882/pexels-photo-6957882.jpeg" 
                    alt="Comida para gatos" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="mt-2">
                  <h3 className="text-xs font-medium text-card-foreground">Alimentación natural</h3>
                  <p className="text-[11px] text-muted-foreground">Nutrición premium</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}