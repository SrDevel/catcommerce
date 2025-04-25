import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function SpecialOffer() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-3xl glassmorphism p-6 md:p-10 lg:p-16">
          {/* Animated background elements */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-90"></div>
          
          <motion.div 
            className="absolute top-10 right-10 text-white/10 text-[120px]"
            initial={{ rotate: 0, opacity: 0.05 }}
            animate={{ rotate: 10, opacity: 0.1 }}
            transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse' }}
          >
            🐾
          </motion.div>
          
          <motion.div 
            className="absolute bottom-10 left-10 text-white/10 text-[100px]"
            initial={{ rotate: 0, opacity: 0.05 }}
            animate={{ rotate: -10, opacity: 0.1 }}
            transition={{ duration: 12, repeat: Infinity, repeatType: 'reverse', delay: 1 }}
          >
            🐱
          </motion.div>
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="text-center lg:text-left text-white">
              <Badge variant="outline" className="border-white/20 text-white mb-4">
                OFERTA ESPECIAL
              </Badge>
              
              <motion.h2 
                className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                25% de descuento en toda la línea Premium
              </motion.h2>
              
              <motion.p 
                className="text-lg md:text-xl opacity-90 mb-8 max-w-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Consiéntelo con lo mejor. Promoción válida hasta fin de mes o agotar existencias.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Button asChild size="lg" variant="default" className="rounded-full bg-white text-blue-600 hover:bg-white/90 hover:text-blue-700">
                  <Link to="/productos?oferta=true" className="group">
                    Ver ofertas
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2 transition-transform group-hover:translate-x-1"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                  </Link>
                </Button>
              </motion.div>
            </div>
            
            <motion.div
              className="relative float"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <div className="w-64 h-64 md:w-80 md:h-80 relative">
                <div className="absolute inset-0 rounded-full bg-white/20 blur-2xl"></div>
                <img 
                  src="https://images.pexels.com/photos/2286016/pexels-photo-2286016.jpeg"
                  alt="Gato premium" 
                  className="relative rounded-full object-cover w-full h-full border-8 border-white/30"
                />
                
                <motion.div
                  className="absolute -right-8 -top-8 h-20 w-20 rounded-full bg-yellow-500 flex items-center justify-center text-blue-900 font-bold rotate-12 text-lg"
                  animate={{ 
                    rotate: [12, -12, 12],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ 
                    duration: 5, 
                    repeat: Infinity,
                    repeatType: 'reverse'
                  }}
                >
                  -25%
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}