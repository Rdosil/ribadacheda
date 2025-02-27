
import React, { useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';

const Features = () => {
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
    <section ref={sectionRef} className="relative overflow-hidden">
      {/* Sustainable Fishing */}
      <div className="py-20 relative">
        <div className="absolute inset-0 bg-sea-pattern bg-cover bg-center bg-no-repeat"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="md:max-w-lg ml-auto">
            <div className="glass rounded-xl p-10 animate-on-scroll">
              <span className="inline-block px-3 py-1 mb-4 text-xs font-medium tracking-wider text-white uppercase bg-sea-600 rounded-full">
                Nuestra Filosofía
              </span>
              <h2 className="text-3xl font-bold mb-6 text-gray-900 font-serif">Pesca Sostenible</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Seleccionamos solo las mejores piezas de los mariscos y pescados salvajes procedentes de la pesca artesanal de la "Costa da Morte", garantizando calidad y sabor en cada bocado.
              </p>
              <Button 
                className="bg-sea-600 hover:bg-sea-700 text-white"
                asChild
              >
                <a href="#reservar">Reservar Mesa</a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Exclusive Wines */}
      <div className="py-20 bg-sand-50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2 animate-on-scroll">
              <span className="inline-block px-3 py-1 mb-4 text-xs font-medium tracking-wider text-wine-700 uppercase bg-wine-50 rounded-full">
                Nuestra Bodega
              </span>
              <h2 className="text-3xl font-bold mb-6 text-gray-900 font-serif">Vinos Exclusivos</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Explora nuestra vinoteca con más de 300 referencias de vinos de alta gama y ediciones limitadas de las bodegas gallegas y nacionales más prestigiosas. Para disfrutarlos plenamente utilizamos cristalería Riedel y Zwiesel.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Con estas copas se libera el aroma del vino, se resalta la fruta y se equilibran los taninos de los vinos tintos y blancos con barrica, mejorando el sabor y su textura. "Llegando a la conclusión de que utilizamos el instrumento del vino correcto".
              </p>
              <Button 
                className="bg-wine-600 hover:bg-wine-700 text-white"
                asChild
              >
                <a href="#reservar">Reservar Mesa</a>
              </Button>
            </div>
            <div className="md:w-1/2 animate-on-scroll" style={{ transitionDelay: '0.2s' }}>
              <div className="relative">
                <img 
                  src="/images/wine-glasses.jpg" 
                  alt="Selección de vinos" 
                  className="w-full h-auto rounded-xl shadow-elegant"
                />
                <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-elegant hidden md:block">
                  <img 
                    src="/images/wine-bottles.jpg" 
                    alt="Botellas de vino" 
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Coastal Setting */}
      <div className="py-20 relative">
        <div className="absolute inset-0 bg-[url('/images/coastal-bg.jpg')] bg-cover bg-center bg-no-repeat">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-xs"></div>
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-lg mr-auto">
            <div className="glass bg-white/40 rounded-xl p-10 animate-on-scroll">
              <span className="inline-block px-3 py-1 mb-4 text-xs font-medium tracking-wider text-white uppercase bg-sea-700/80 rounded-full backdrop-blur-sm">
                Nuestro Entorno
              </span>
              <h2 className="text-3xl font-bold mb-6 text-white font-serif">Rodeado de Salitre</h2>
              <p className="text-white/90 mb-6 leading-relaxed">
                Disfruta de un paisaje sobrecojedor diseñado por la naturaleza para que cada visita sea única.
              </p>
              <Button 
                className="bg-sea-600/90 hover:bg-sea-700 text-white backdrop-blur-sm"
                asChild
              >
                <a href="#reservar">Reservar Mesa</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
