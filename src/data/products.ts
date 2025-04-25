import { Product } from '@/types/product';

// Helper function to generate unique IDs
function generateId(index: number): string {
  return `product-${index + 1}`;
}

export const mockProducts: Product[] = [
  // Alimentos
  {
    id: generateId(0),
    name: 'Alimento Premium para Gatos',
    description: 'Nutrición completa y balanceada para gatos adultos. Rico en proteínas y bajo en carbohidratos.',
    price: 22.99,
    discount: 10,
    images: [
      'https://images.pexels.com/photos/6957882/pexels-photo-6957882.jpeg',
      'https://images.pexels.com/photos/6957868/pexels-photo-6957868.jpeg'
    ],
    category: 'alimentos',
    stock: 25,
    rating: 4.7,
    reviewCount: 128,
    featured: 9,
    ageRange: ['Adulto'],
    createdAt: '2025-02-15T00:00:00.000Z',
    attributes: {
      'Peso': '2kg',
      'Sin cereales': true,
      'Proteína': '38%'
    }
  },
  {
    id: generateId(1),
    name: 'Latas Húmedas Gourmet para Gatitos',
    description: 'Alimento húmedo con trocitos de pescado en salsa para gatitos en crecimiento.',
    price: 13.99,
    discount: 0,
    images: [
      'https://images.pexels.com/photos/6957785/pexels-photo-6957785.jpeg',
      'https://images.pexels.com/photos/5731866/pexels-photo-5731866.jpeg'
    ],
    category: 'alimentos',
    stock: 45,
    rating: 4.5,
    reviewCount: 89,
    featured: 6,
    ageRange: ['Gatito'],
    createdAt: '2025-03-01T00:00:00.000Z'
  },
  {
    id: generateId(2),
    name: 'Alimento Especial Gatos Senior',
    description: 'Formulado para gatos mayores de 7 años con articulaciones sensibles y sistema inmune debilitado.',
    price: 24.99,
    discount: 5,
    images: [
      'https://images.pexels.com/photos/6957689/pexels-photo-6957689.jpeg'
    ],
    category: 'alimentos',
    stock: 18,
    rating: 4.8,
    reviewCount: 56,
    featured: 7,
    ageRange: ['Senior'],
    createdAt: '2025-01-20T00:00:00.000Z'
  },
  
  // Juguetes
  {
    id: generateId(3),
    name: 'Juguete Interactivo con Plumas',
    description: 'Estimula el instinto cazador de tu gato con este juguete de plumas y cascabel.',
    price: 14.99,
    discount: 0,
    images: [
      'https://images.pexels.com/photos/2061057/pexels-photo-2061057.jpeg'
    ],
    category: 'juguetes',
    stock: 32,
    rating: 4.9,
    reviewCount: 76,
    featured: 8,
    ageRange: ['Gatito', 'Adulto', 'Senior'],
    createdAt: '2025-03-10T00:00:00.000Z'
  },
  {
    id: generateId(4),
    name: 'Ratón Electrónico Interactivo',
    description: 'Ratón a control remoto que se mueve de forma errática para entretener a tu gato durante horas.',
    price: 19.99,
    discount: 15,
    images: [
      'https://images.pexels.com/photos/4587971/pexels-photo-4587971.jpeg'
    ],
    category: 'juguetes',
    stock: 12,
    rating: 4.3,
    reviewCount: 42,
    featured: 5,
    ageRange: ['Gatito', 'Adulto'],
    createdAt: '2025-02-22T00:00:00.000Z'
  },
  {
    id: generateId(5),
    name: 'Torre de Juegos con Rascador',
    description: 'Centro de actividades con túneles, plataformas y postes rascadores para que tu gato se ejercite.',
    price: 49.99,
    discount: 0,
    images: [
      'https://images.pexels.com/photos/7725039/pexels-photo-7725039.jpeg'
    ],
    category: 'juguetes',
    stock: 8,
    rating: 4.7,
    reviewCount: 38,
    featured: 7,
    ageRange: ['Gatito', 'Adulto'],
    createdAt: '2025-01-15T00:00:00.000Z'
  },
  
  // Accesorios
  {
    id: generateId(6),
    name: 'Collar Ajustable con Cascabel',
    description: 'Collar seguro con mecanismo de liberación rápida y cascabel para localizar a tu gato.',
    price: 9.99,
    discount: 0,
    images: [
      'https://images.pexels.com/photos/997245/pexels-photo-997245.jpeg'
    ],
    category: 'accesorios',
    stock: 50,
    rating: 4.4,
    reviewCount: 94,
    featured: 6,
    ageRange: ['Gatito', 'Adulto', 'Senior'],
    createdAt: '2025-03-05T00:00:00.000Z'
  },
  {
    id: generateId(7),
    name: 'Transportín Premium',
    description: 'Transportín espacioso y seguro para viajes y visitas al veterinario, con ventilación óptima.',
    price: 39.99,
    discount: 0,
    images: [
      'https://images.pexels.com/photos/6957763/pexels-photo-6957763.jpeg'
    ],
    category: 'accesorios',
    stock: 15,
    rating: 4.6,
    reviewCount: 47,
    featured: 4,
    ageRange: ['Gatito', 'Adulto', 'Senior'],
    createdAt: '2025-02-10T00:00:00.000Z'
  },
  {
    id: generateId(8),
    name: 'Comedero Automático Programable',
    description: 'Dispensa porciones controladas de alimento hasta 5 veces al día, ideal para controlar la dieta.',
    price: 59.99,
    discount: 10,
    images: [
      'https://images.pexels.com/photos/7210280/pexels-photo-7210280.jpeg'
    ],
    category: 'accesorios',
    stock: 10,
    rating: 4.8,
    reviewCount: 35,
    featured: 8,
    ageRange: ['Adulto', 'Senior'],
    createdAt: '2025-01-25T00:00:00.000Z'
  },
  
  // Camas
  {
    id: generateId(9),
    name: 'Cama Donut Suave',
    description: 'Cama en forma de donut con relleno mullido para que tu gato duerma cómodamente acurrucado.',
    price: 29.99,
    discount: 0,
    images: [
      'https://images.pexels.com/photos/6413564/pexels-photo-6413564.jpeg'
    ],
    category: 'camas',
    stock: 20,
    rating: 4.7,
    reviewCount: 68,
    featured: 9,
    ageRange: ['Gatito', 'Adulto', 'Senior'],
    createdAt: '2025-03-12T00:00:00.000Z'
  },
  {
    id: generateId(10),
    name: 'Hamaca para Radiador',
    description: 'Hamaca que se sujeta al radiador para que tu gato disfrute del calor en altura.',
    price: 19.99,
    discount: 0,
    images: [
      'https://images.pexels.com/photos/736527/pexels-photo-736527.jpeg'
    ],
    category: 'camas',
    stock: 25,
    rating: 4.3,
    reviewCount: 41,
    featured: 3,
    ageRange: ['Adulto', 'Senior'],
    createdAt: '2025-02-05T00:00:00.000Z'
  },
  {
    id: generateId(11),
    name: 'Cueva Acogedora para Gatos',
    description: 'Cueva cerrada con diseño acogedor para gatos que prefieren privacidad y calidez.',
    price: 34.99,
    discount: 15,
    images: [
      'https://images.pexels.com/photos/1983032/pexels-photo-1983032.jpeg'
    ],
    category: 'camas',
    stock: 15,
    rating: 4.5,
    reviewCount: 52,
    featured: 5,
    ageRange: ['Gatito', 'Adulto', 'Senior'],
    createdAt: '2025-01-10T00:00:00.000Z'
  },
  
  // Higiene
  {
    id: generateId(12),
    name: 'Arena Aglomerante Premium',
    description: 'Arena de alta calidad que forma grumos sólidos para una limpieza fácil y control de olores.',
    price: 17.99,
    discount: 0,
    images: [
      'https://images.pexels.com/photos/4587955/pexels-photo-4587955.jpeg'
    ],
    category: 'higiene',
    stock: 40,
    rating: 4.8,
    reviewCount: 86,
    featured: 8,
    ageRange: ['Gatito', 'Adulto', 'Senior'],
    createdAt: '2025-03-15T00:00:00.000Z'
  },
  {
    id: generateId(13),
    name: 'Bandeja Sanitaria Cubierta',
    description: 'Bandeja con cubierta y filtro de carbón para máxima privacidad y reducción de olores.',
    price: 29.99,
    discount: 5,
    images: [
      'https://images.pexels.com/photos/7210554/pexels-photo-7210554.jpeg'
    ],
    category: 'higiene',
    stock: 18,
    rating: 4.6,
    reviewCount: 63,
    featured: 6,
    ageRange: ['Gatito', 'Adulto', 'Senior'],
    createdAt: '2025-02-25T00:00:00.000Z'
  },
  {
    id: generateId(14),
    name: 'Champú Especial para Gatos',
    description: 'Champú suave formulado específicamente para el pH de la piel felina, sin irritantes.',
    price: 12.99,
    discount: 0,
    images: [
      'https://images.pexels.com/photos/10815068/pexels-photo-10815068.jpeg'
    ],
    category: 'higiene',
    stock: 30,
    rating: 4.4,
    reviewCount: 37,
    featured: 4,
    ageRange: ['Gatito', 'Adulto', 'Senior'],
    createdAt: '2025-01-30T00:00:00.000Z'
  },
  
  // Rascadores
  {
    id: generateId(15),
    name: 'Rascador Vertical de Sisal',
    description: 'Poste rascador recubierto de sisal natural que satisface el instinto de arañar de tu gato.',
    price: 39.99,
    discount: 10,
    images: [
      'https://images.pexels.com/photos/7725019/pexels-photo-7725019.jpeg'
    ],
    category: 'rascadores',
    stock: 22,
    rating: 4.7,
    reviewCount: 57,
    featured: 7,
    ageRange: ['Gatito', 'Adulto'],
    createdAt: '2025-03-20T00:00:00.000Z'
  },
  {
    id: generateId(16),
    name: 'Rascador Horizontal Ondulado',
    description: 'Rascador horizontal con superficie ondulada de cartón reciclado y catnip incluido.',
    price: 24.99,
    discount: 0,
    images: [
      'https://images.pexels.com/photos/6957887/pexels-photo-6957887.jpeg'
    ],
    category: 'rascadores',
    stock: 35,
    rating: 4.5,
    reviewCount: 49,
    featured: 5,
    ageRange: ['Gatito', 'Adulto', 'Senior'],
    createdAt: '2025-02-18T00:00:00.000Z'
  },
  {
    id: generateId(17),
    name: 'Árbol Rascador Multinivel',
    description: 'Centro de actividades con varios niveles, rascadores, cuevas y plataformas de observación.',
    price: 89.99,
    discount: 15,
    images: [
      'https://images.pexels.com/photos/5342293/pexels-photo-5342293.jpeg'
    ],
    category: 'rascadores',
    stock: 8,
    rating: 4.9,
    reviewCount: 32,
    featured: 9,
    ageRange: ['Gatito', 'Adulto'],
    createdAt: '2025-01-05T00:00:00.000Z'
  },
  
  // Más productos de varias categorías
  {
    id: generateId(18),
    name: 'Snacks Naturales para Gatos',
    description: 'Treats liofilizados 100% naturales sin aditivos ni conservantes artificiales.',
    price: 8.99,
    discount: 0,
    images: [
      'https://images.pexels.com/photos/5731866/pexels-photo-5731866.jpeg'
    ],
    category: 'alimentos',
    stock: 60,
    rating: 4.6,
    reviewCount: 73,
    featured: 6,
    ageRange: ['Gatito', 'Adulto', 'Senior'],
    createdAt: '2025-03-25T00:00:00.000Z'
  },
  {
    id: generateId(19),
    name: 'Juguete Láser Automático',
    description: 'Juguete láser con movimientos aleatorios que entretiene a tu gato aunque no estés en casa.',
    price: 27.99,
    discount: 5,
    images: [
      'https://images.pexels.com/photos/1643457/pexels-photo-1643457.jpeg'
    ],
    category: 'juguetes',
    stock: 14,
    rating: 4.4,
    reviewCount: 39,
    featured: 5,
    ageRange: ['Gatito', 'Adulto'],
    createdAt: '2025-02-12T00:00:00.000Z'
  },
  {
    id: generateId(20),
    name: 'Fuente de Agua para Gatos',
    description: 'Fuente con filtro que mantiene el agua fresca y en movimiento para estimular a tu gato a beber más.',
    price: 32.99,
    discount: 0,
    images: [
      'https://images.pexels.com/photos/6958149/pexels-photo-6958149.jpeg'
    ],
    category: 'accesorios',
    stock: 17,
    rating: 4.8,
    reviewCount: 64,
    featured: 8,
    ageRange: ['Gatito', 'Adulto', 'Senior'],
    createdAt: '2025-01-22T00:00:00.000Z'
  },
  {
    id: generateId(21),
    name: 'Mochila Transportadora Espacial',
    description: 'Mochila con ventana transparente tipo cápsula espacial para transportar a tu gato con estilo.',
    price: 49.99,
    discount: 10,
    images: [
      'https://images.pexels.com/photos/9304725/pexels-photo-9304725.jpeg'
    ],
    category: 'accesorios',
    stock: 13,
    rating: 4.7,
    reviewCount: 28,
    featured: 7,
    ageRange: ['Gatito', 'Adulto'],
    createdAt: '2025-03-08T00:00:00.000Z'
  },
  {
    id: generateId(22),
    name: 'Cama Térmica Autorregulable',
    description: 'Cama que refleja el calor corporal del gato, ideal para gatos mayores con dolor articular.',
    price: 39.99,
    discount: 0,
    images: [
      'https://images.pexels.com/photos/2061057/pexels-photo-2061057.jpeg'
    ],
    category: 'camas',
    stock: 16,
    rating: 4.5,
    reviewCount: 31,
    featured: 6,
    ageRange: ['Senior'],
    createdAt: '2025-02-28T00:00:00.000Z'
  },
  {
    id: generateId(23),
    name: 'Peine Deslanador Profesional',
    description: 'Peine ergonómico que elimina el pelo muerto y reduce la formación de bolas de pelo.',
    price: 19.99,
    discount: 0,
    images: [
      'https://images.pexels.com/photos/6958129/pexels-photo-6958129.jpeg'
    ],
    category: 'higiene',
    stock: 42,
    rating: 4.6,
    reviewCount: 58,
    featured: 5,
    ageRange: ['Adulto', 'Senior'],
    createdAt: '2025-01-17T00:00:00.000Z'
  },
  {
    id: generateId(24),
    name: 'Rascador de Esquina Modular',
    description: 'Sistema modular de rascadores que se pueden configurar de diferentes formas según el espacio.',
    price: 34.99,
    discount: 5,
    images: [
      'https://images.pexels.com/photos/6957881/pexels-photo-6957881.jpeg'
    ],
    category: 'rascadores',
    stock: 19,
    rating: 4.4,
    reviewCount: 27,
    featured: 4,
    ageRange: ['Gatito', 'Adulto'],
    createdAt: '2025-03-18T00:00:00.000Z'
  },
];

export { mockProducts as products };