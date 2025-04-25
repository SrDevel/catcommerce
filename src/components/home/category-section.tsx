import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const categories = [
  {
    id: 'alimentos',
    name: 'Alimentos',
    description: 'Nutrición premium para tu felino',
    image: 'https://images.pexels.com/photos/5731866/pexels-photo-5731866.jpeg',
    icon: '🍗',
  },
  {
    id: 'juguetes',
    name: 'Juguetes',
    description: 'Diversión y ejercicio garantizado',
    image: 'https://images.pexels.com/photos/2061057/pexels-photo-2061057.jpeg',
    icon: '🧶',
  },
  {
    id: 'accesorios',
    name: 'Accesorios',
    description: 'Todo para su confort diario',
    image: 'https://images.pexels.com/photos/997245/pexels-photo-997245.jpeg',
    icon: '🐱',
  },
  {
    id: 'camas',
    name: 'Camas',
    description: 'Descanso de calidad para tu mascota',
    image: 'https://images.pexels.com/photos/6413564/pexels-photo-6413564.jpeg',
    icon: '💤',
  },
  {
    id: 'higiene',
    name: 'Higiene',
    description: 'Productos para su limpieza y cuidado',
    image: 'https://images.pexels.com/photos/4587955/pexels-photo-4587955.jpeg',
    icon: '🧼',
  },
  {
    id: 'rascadores',
    name: 'Rascadores',
    description: 'Protege tus muebles con estilo',
    image: 'https://images.pexels.com/photos/7725019/pexels-photo-7725019.jpeg',
    icon: '🪚',
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function CategorySection() {
  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-white dark:from-blue-950 dark:to-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.span 
            className="inline-block text-blue-600 dark:text-blue-400 font-medium mb-3"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            EXPLORA NUESTRAS CATEGORÍAS
          </motion.span>
          
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Todo lo que tu gato necesita
          </motion.h2>
          
          <motion.p 
            className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Descubre nuestra amplia gama de productos especializados para gatos,
            diseñados para satisfacer todas sus necesidades y caprichos.
          </motion.p>
        </div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {categories.map((category) => (
            <motion.div 
              key={category.id}
              variants={item}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group"
            >
              <Link to={`/productos?categoria=${category.id}`} className="block h-full">
                <div className="relative h-full rounded-xl overflow-hidden glassmorphism card-hover">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-950/70 z-10"></div>
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  <div className="relative z-20 p-6 flex flex-col h-full">
                    <div className="flex-grow flex flex-col justify-end">
                      <div className="mb-4 flex items-center space-x-2">
                        <span className="text-2xl">{category.icon}</span>
                        <h3 className="text-xl font-semibold text-white">{category.name}</h3>
                      </div>
                      <p className="text-white/90 mb-4">{category.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-white bg-blue-600/80 px-3 py-1 rounded-full">
                          Ver productos
                        </span>
                        <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}