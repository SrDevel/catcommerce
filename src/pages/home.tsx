import { HeroSection } from '@/components/home/hero-section';
import { CategorySection } from '@/components/home/category-section';
import { FeaturedProducts } from '@/components/home/featured-products';
import { SpecialOffer } from '@/components/home/special-offer';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

export default function Home() {
  return (
    <>
      <Helmet>
        <title>CatCommerce - La tienda para tu gato</title>
        <meta name="description" content="Todo lo que tu gato necesita para una vida feliz y saludable. Productos de calidad para tu felino favorito." />
      </Helmet>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="pb-16"
      >
        <HeroSection />
        <CategorySection />
        <FeaturedProducts />
        <SpecialOffer />
      </motion.div>
    </>
  );
}