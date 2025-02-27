
import React, { useState, useRef, useEffect } from 'react';
import WineCard from './ui/wine-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Define wine categories
const wineCategories = [
  { id: 'tintos', label: 'Tintos' },
  { id: 'blancos', label: 'Blancos' },
  { id: 'rosados', label: 'Rosados' },
  { id: 'espumosos', label: 'Espumosos' },
  { id: 'especiales', label: 'Especiales' },
];

// Sample wine data
const wines = {
  tintos: [
    {
      name: 'Alión Reserva',
      type: 'Tempranillo',
      region: 'Ribera del Duero',
      year: '2018',
      price: '72€',
      description: 'Vino de gran estructura con aromas a frutos rojos maduros, especias y notas balsámicas.',
      image: '/images/wine-red-1.jpg',
    },
    {
      name: 'Pago de Carraovejas',
      type: 'Tempranillo, Cabernet Sauvignon',
      region: 'Ribera del Duero',
      year: '2019',
      price: '46€',
      description: 'Intenso y complejo, con aromas de fruta negra madura, especias y sutiles notas tostadas.',
      image: '/images/wine-red-2.jpg',
    },
    {
      name: 'Viña Pedrosa Gran Reserva',
      type: 'Tempranillo',
      region: 'Ribera del Duero',
      year: '2015',
      price: '65€',
      description: 'Elegante y potente, con aromas de fruta negra, especias, tabaco y cuero.',
      image: '/images/wine-red-3.jpg',
    },
    {
      name: 'Pintia',
      type: 'Tinta de Toro',
      region: 'Toro',
      year: '2017',
      price: '59€',
      description: 'Potente, con aromas de frutos rojos y negros maduros, especias y notas minerales.',
      image: '/images/wine-red-4.jpg',
      badge: 'Destacado',
    },
  ],
  blancos: [
    {
      name: 'Pazo Señorans',
      type: 'Albariño',
      region: 'Rías Baixas',
      year: '2022',
      price: '24€',
      description: 'Fresco y aromático, con notas de fruta blanca, cítricos y flores blancas.',
      image: '/images/wine-white-1.jpg',
    },
    {
      name: 'Do Ferreiro Cepas Vellas',
      type: 'Albariño',
      region: 'Rías Baixas',
      year: '2020',
      price: '42€',
      description: 'Intenso y complejo, con aromas de frutas de hueso, hierbas y matices salinos.',
      image: '/images/wine-white-2.jpg',
      badge: 'Edición Limitada',
    },
    {
      name: 'Godello Valdeorras',
      type: 'Godello',
      region: 'Valdeorras',
      year: '2021',
      price: '22€',
      description: 'Elegante, con aromas de manzana verde, pera y notas minerales.',
      image: '/images/wine-white-3.jpg',
    },
    {
      name: 'Leirana',
      type: 'Albariño',
      region: 'Rías Baixas',
      year: '2021',
      price: '28€',
      description: 'Fresco y mineral, con aromas de frutas cítricas, flores blancas y notas salinas.',
      image: '/images/wine-white-4.jpg',
    },
  ],
  rosados: [
    {
      name: 'Viña Tondonia Rosado',
      type: 'Garnacha, Tempranillo',
      region: 'Rioja',
      year: '2012',
      price: '32€',
      description: 'Rosado de gran complejidad, con aromas de frutos rojos, especias y notas de crianza.',
      image: '/images/wine-rose-1.jpg',
    },
    {
      name: 'Chivite Las Fincas',
      type: 'Garnacha',
      region: 'Navarra',
      year: '2022',
      price: '19€',
      description: 'Elegante y fresco, con aromas de frutos rojos y notas florales.',
      image: '/images/wine-rose-2.jpg',
    },
  ],
  espumosos: [
    {
      name: 'Gramona III Lustros',
      type: 'Xarel·lo, Macabeo',
      region: 'Cava',
      year: '2015',
      price: '46€',
      description: 'Cava de larga crianza, complejo y elegante, con aromas de fruta madura, pastelería y notas tostadas.',
      image: '/images/wine-sparkling-1.jpg',
    },
    {
      name: 'Recaredo Reserva Particular',
      type: 'Xarel·lo, Macabeo',
      region: 'Corpinnat',
      year: '2010',
      price: '65€',
      description: 'Excepcional espumoso con larga crianza, complejo y fino, con aromas de fruta confitada, pastelería y notas tostadas.',
      image: '/images/wine-sparkling-2.jpg',
      badge: 'Premium',
    },
  ],
  especiales: [
    {
      name: 'Toro Albala Don PX',
      type: 'Pedro Ximénez',
      region: 'Montilla-Moriles',
      year: '1987',
      price: '95€',
      description: 'Vino dulce excepcional, con aromas de pasas, dátiles, chocolate y café.',
      image: '/images/wine-special-1.jpg',
    },
    {
      name: 'Lustau VORS Oloroso',
      type: 'Palomino',
      region: 'Jerez',
      year: '30 años',
      price: '75€',
      description: 'Vino generoso de gran complejidad, con aromas de frutos secos, especias y notas de madera noble.',
      image: '/images/wine-special-2.jpg',
    },
  ],
};

const WineMenu = () => {
  const [activeTab, setActiveTab] = useState('tintos');
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const currentElements = sectionRef.current?.querySelectorAll('.animate-on-scroll');
    currentElements?.forEach((el) => observer.observe(el));

    return () => {
      currentElements?.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <section id="vinos" className="py-20 bg-menu-pattern bg-cover bg-center" ref={sectionRef}>
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16 animate-on-scroll">
          <span className="inline-block px-3 py-1 mb-4 text-xs font-medium tracking-wider text-wine-700 uppercase bg-white rounded-full">
            Nuestra Bodega
          </span>
          <h2 className="text-3xl font-bold mb-6 text-gray-900 font-serif md:text-4xl">
            Descubre Nuestra Carta de Vinos
          </h2>
          <div className="w-20 h-1 bg-wine-500 mx-auto mb-6"></div>
          <p className="text-gray-700 leading-relaxed">
            Seleccionamos cuidadosamente nuestros vinos para ofrecer a nuestros clientes una experiencia única. Disponemos de una amplia variedad de referencias que incluyen vinos de pequeñas bodegas y ediciones limitadas.
          </p>
        </div>

        <div className="glass bg-white/90 rounded-xl p-8 shadow-elegant animate-on-scroll">
          <Tabs defaultValue="tintos" className="w-full">
            <TabsList className="w-full flex overflow-x-auto gap-2 p-1 mb-8 bg-gray-100 rounded-lg">
              {wineCategories.map((category) => (
                <TabsTrigger 
                  key={category.id}
                  value={category.id}
                  className="flex-1 py-2 px-4 rounded-md data-[state=active]:bg-wine-600 data-[state=active]:text-white transition-all"
                  onClick={() => setActiveTab(category.id)}
                >
                  {category.label}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {wineCategories.map((category) => (
              <TabsContent key={category.id} value={category.id} className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {wines[category.id as keyof typeof wines].map((wine, index) => (
                    <WineCard
                      key={index}
                      name={wine.name}
                      type={wine.type}
                      region={wine.region}
                      year={wine.year}
                      price={wine.price}
                      description={wine.description}
                      image={wine.image}
                      badge={wine.badge}
                      className="animate-on-scroll"
                      style={{ transitionDelay: `${index * 0.1}s` }}
                    />
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default WineMenu;
