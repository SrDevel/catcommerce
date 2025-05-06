import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Filter, Search, SlidersHorizontal, Cat, ChevronDown, X } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { ProductCard } from '@/components/products/product-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { useProducts } from '@/hooks/use-products';

export default function ProductList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  // Filters
  const [category, setCategory] = useState<string>(searchParams.get('categoria') || '');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [sort, setSort] = useState<string>(searchParams.get('ordenar') || 'featured');
  const [searchTerm, setSearchTerm] = useState<string>(searchParams.get('buscar') || '');
  const [ageFilters, setAgeFilters] = useState<string[]>([]);

  const { products, isLoading, error, loadMore, hasMore } = useProducts({
    category, 
    minPrice: priceRange[0], 
    maxPrice: priceRange[1],
    sort,
    search: searchTerm,
    ageFilters
  });

  // Update URL parameters when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    
    if (category) params.set('categoria', category);
    if (searchTerm) params.set('buscar', searchTerm);
    if (sort !== 'featured') params.set('ordenar', sort);
    
    setSearchParams(params, { replace: true });
  }, [category, sort, searchTerm, setSearchParams]);

  // Handle category change from URL
  useEffect(() => {
    const categoryParam = searchParams.get('categoria');
    if (categoryParam) {
      setCategory(categoryParam);
    }
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // The search state is already updated through the input onChange,
    // this just prevents form submission
  };

  const handleAgeFilterChange = (value: string) => {
    setAgeFilters(prev => {
      if (prev.includes(value)) {
        return prev.filter(item => item !== value);
      } else {
        return [...prev, value];
      }
    });
  };

  const clearFilters = () => {
    setCategory('');
    setPriceRange([0, 200]);
    setSort('featured');
    setSearchTerm('');
    setAgeFilters([]);
    setSearchParams({});
  };

  const categoryNames: Record<string, string> = {
    'alimentos': 'Alimentos',
    'juguetes': 'Juguetes',
    'accesorios': 'Accesorios',
    'camas': 'Camas',
    'higiene': 'Higiene',
    'rascadores': 'Rascadores',
    'salud': 'Salud y Bienestar'
  };

  return (
    <>
      <Helmet>
        <title>
          {category ? `${categoryNames[category] || 'Productos'} para gatos | Felino` : 'Productos para gatos | Felino'}
        </title>
        <meta 
          name="description" 
          content={category
            ? `Explora nuestra selección de ${categoryNames[category]?.toLowerCase() || 'productos'} para gatos de alta calidad. Envíos rápidos y garantía de satisfacción.`
            : "Descubre nuestra completa gama de productos para gatos. Alimentos, juguetes, accesorios y más para consentir a tu felino favorito."
          }
        />
      </Helmet>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Hero Banner */}
        <section className="relative bg-gradient-to-r from-blue-600 to-indigo-600 py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center text-center text-white">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                {category 
                  ? `${categoryNames[category] || 'Productos'} para Gatos`
                  : 'Todos los Productos para tu Felino'
                }
              </h1>
              <p className="text-white/90 max-w-2xl">
                {category
                  ? `Descubre nuestra colección de ${categoryNames[category]?.toLowerCase() || 'productos'} de alta calidad para mantener a tu gato feliz y saludable.`
                  : 'Explora nuestra amplia variedad de productos para gatos. Desde alimentos premium hasta accesorios exclusivos para consentir a tu mascota.'
                }
              </p>
            </div>
          </div>
          
          <div className="absolute inset-0 -z-10 overflow-hidden">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="absolute text-white/5"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  fontSize: `${Math.random() * 60 + 20}px`,
                  transform: `rotate(${Math.random() * 360}deg)`,
                }}
              >
                🐾
              </div>
            ))}
          </div>
        </section>

        {/* Products and Filters */}
        <section className="py-10">
          <div className="container mx-auto px-4">
            {/* Mobile Filter Controls */}
            <div className="flex items-center justify-between mb-6 lg:hidden">
              <p className="text-sm">
                {products?.length ?? 0} productos encontrados
              </p>
              
              <div className="flex space-x-2">
                <Sheet open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="sm" className="flex items-center">
                      <Filter className="h-4 w-4 mr-2" />
                      Filtros
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-4/5 sm:w-80">
                    <SheetHeader>
                      <SheetTitle>Filtros</SheetTitle>
                      <SheetDescription>
                        Refina tu búsqueda con estos filtros
                      </SheetDescription>
                    </SheetHeader>
                    <div className="py-4">
                      <form onSubmit={handleSearch} className="mb-6">
                        <div className="relative">
                          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            type="search"
                            placeholder="Buscar productos..."
                            className="pl-8 pr-4"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                          />
                        </div>
                      </form>
                      
                      <Accordion type="single" collapsible defaultValue="category">
                        <AccordionItem value="category">
                          <AccordionTrigger>Categorías</AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-2 ml-1">
                              {Object.entries(categoryNames).map(([key, name]) => (
                                <div key={key} className="flex items-center space-x-2">
                                  <Checkbox 
                                    id={`category-${key}-mobile`} 
                                    checked={category === key}
                                    onCheckedChange={() => setCategory(category === key ? '' : key)}
                                  />
                                  <Label 
                                    htmlFor={`category-${key}-mobile`}
                                    className="text-sm cursor-pointer"
                                  >
                                    {name}
                                  </Label>
                                </div>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                        
                        <AccordionItem value="price">
                          <AccordionTrigger>Precio</AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4 px-1">
                              <Slider
                                defaultValue={[0, 200]}
                                max={200}
                                step={1}
                                value={priceRange}
                                onValueChange={(value) => setPriceRange(value as [number, number])}
                              />
                              <div className="flex justify-between">
                                <span className="text-sm">{priceRange[0]}€</span>
                                <span className="text-sm">{priceRange[1]}€</span>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                        
                        <AccordionItem value="age">
                          <AccordionTrigger>Edad del gato</AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-2 ml-1">
                              {['Gatito', 'Adulto', 'Senior'].map((age) => (
                                <div key={age} className="flex items-center space-x-2">
                                  <Checkbox 
                                    id={`age-${age}-mobile`} 
                                    checked={ageFilters.includes(age)}
                                    onCheckedChange={() => handleAgeFilterChange(age)}
                                  />
                                  <Label 
                                    htmlFor={`age-${age}-mobile`}
                                    className="text-sm cursor-pointer"
                                  >
                                    {age}
                                  </Label>
                                </div>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                      
                      <div className="mt-6 flex justify-between">
                        <Button variant="outline" size="sm" onClick={clearFilters}>
                          Limpiar filtros
                        </Button>
                        <Button size="sm" onClick={() => setIsFiltersOpen(false)}>
                          Ver resultados
                        </Button>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
                
                <Select value={sort} onValueChange={setSort}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Ordenar por" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Destacados</SelectItem>
                    <SelectItem value="price-asc">Precio: Menor a Mayor</SelectItem>
                    <SelectItem value="price-desc">Precio: Mayor a Menor</SelectItem>
                    <SelectItem value="rating-desc">Mejor valorados</SelectItem>
                    <SelectItem value="newest">Más recientes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
              {/* Desktop Filters Sidebar */}
              <div className="hidden lg:block w-64 flex-shrink-0">
                <div className="sticky top-24">
                  <div className="bg-white dark:bg-slate-900 p-6 rounded-xl glassmorphism">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-medium flex items-center">
                        <SlidersHorizontal className="h-4 w-4 mr-2" />
                        Filtros
                      </h3>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={clearFilters}
                        className="text-xs h-8"
                      >
                        Limpiar
                      </Button>
                    </div>
                    
                    <form onSubmit={handleSearch} className="mb-4">
                      <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="search"
                          placeholder="Buscar productos..."
                          className="pl-8 pr-4"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                    </form>
                    
                    <Accordion type="single" collapsible defaultValue="category">
                      <AccordionItem value="category">
                        <AccordionTrigger>Categorías</AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-2 ml-1">
                            {Object.entries(categoryNames).map(([key, name]) => (
                              <div key={key} className="flex items-center space-x-2">
                                <Checkbox 
                                  id={`category-${key}`} 
                                  checked={category === key}
                                  onCheckedChange={() => setCategory(category === key ? '' : key)}
                                />
                                <Label 
                                  htmlFor={`category-${key}`}
                                  className="text-sm cursor-pointer"
                                >
                                  {name}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="price">
                        <AccordionTrigger>Precio</AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-4 px-1">
                            <Slider
                              defaultValue={[0, 200]}
                              max={200}
                              step={1}
                              value={priceRange}
                              onValueChange={(value) => setPriceRange(value as [number, number])}
                            />
                            <div className="flex justify-between">
                              <span className="text-sm">{priceRange[0]}€</span>
                              <span className="text-sm">{priceRange[1]}€</span>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="age">
                        <AccordionTrigger>Edad del gato</AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-2 ml-1">
                            {['Gatito', 'Adulto', 'Senior'].map((age) => (
                              <div key={age} className="flex items-center space-x-2">
                                <Checkbox 
                                  id={`age-${age}`} 
                                  checked={ageFilters.includes(age)}
                                  onCheckedChange={() => handleAgeFilterChange(age)}
                                />
                                <Label 
                                  htmlFor={`age-${age}`}
                                  className="text-sm cursor-pointer"
                                >
                                  {age}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                </div>
              </div>
              
              {/* Products Section */}
              <div className="flex-1">
                {/* Desktop Filter Top Bar */}
                <div className="hidden lg:flex justify-between items-center mb-6">
                  <div className="flex items-center">
                    <span className="text-sm text-muted-foreground mr-2">
                      {products?.length ?? 0} productos encontrados
                    </span>
                    
                    {category && (
                      <Badge 
                        variant="secondary"
                        className="flex items-center gap-1 ml-2"
                      >
                        {categoryNames[category]}
                        <button 
                          onClick={() => setCategory('')} 
                          className="hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full h-4 w-4 inline-flex items-center justify-center ml-1"
                        >
                          <span className="sr-only">Eliminar</span>
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Select value={sort} onValueChange={setSort}>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Ordenar por" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="featured">Destacados</SelectItem>
                        <SelectItem value="price-asc">Precio: Menor a Mayor</SelectItem>
                        <SelectItem value="price-desc">Precio: Mayor a Menor</SelectItem>
                        <SelectItem value="rating-desc">Mejor valorados</SelectItem>
                        <SelectItem value="newest">Más recientes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                {/* Responsive Product Grid */}
                {isLoading ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {[...Array(8)].map((_, index) => (
                      <div key={index} className="animate-pulse glassmorphism rounded-xl h-80"></div>
                    ))}
                  </div>
                ) : error ? (
                  <div className="text-center py-16">
                    <Cat className="h-12 w-12 text-red-500 mx-auto mb-4" />
                    <p className="text-xl font-medium mb-2">¡Ups! Algo salió mal</p>
                    <p className="text-muted-foreground mb-4">
                      No pudimos cargar los productos. Por favor, intenta de nuevo.
                    </p>
                    <Button onClick={() => window.location.reload()}>
                      Reintentar
                    </Button>
                  </div>
                ) : products?.length === 0 ? (
                  <div className="text-center py-16">
                    <Cat className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                    <p className="text-xl font-medium mb-2">No se encontraron productos</p>
                    <p className="text-muted-foreground mb-4">
                      Intenta con otros filtros o términos de búsqueda.
                    </p>
                    <Button onClick={clearFilters}>
                      Limpiar filtros
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                      {products?.map((product) => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                    </div>
                    
                    {hasMore && (
                      <div className="text-center mt-10">
                        <Button 
                          variant="outline" 
                          size="lg" 
                          onClick={loadMore}
                          className="rounded-full"
                        >
                          Cargar más productos
                          <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      </motion.div>
    </>
  );
}