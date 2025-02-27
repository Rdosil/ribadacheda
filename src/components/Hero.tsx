
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div id="inicio" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/hero-bg.jpg" 
          alt="Vista costera de Lariño" 
          className="object-cover w-full h-full"
          onLoad={() => setLoaded(true)}
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-xs"></div>
      </div>
      
      {/* Content */}
      <div className="container relative z-10 px-6 py-16 mx-auto text-center md:text-left">
        <div 
          className={cn(
            "max-w-2xl transition-all duration-700 ease-in-out",
            loaded ? "opacity-100" : "opacity-0 translate-y-8"
          )}
        >
          <span className="inline-block px-3 py-1 mb-6 text-xs font-medium tracking-wider text-white uppercase bg-wine-600/80 rounded-full backdrop-blur-sm">
            Restaurante y Vinoteca
          </span>
          <h1 className="mb-6 text-4xl font-bold text-white sm:text-5xl md:text-6xl font-serif">
            Descubre Lariño <br />
            <span className="text-sea-200">Riba da Cheda</span>
          </h1>
          <p className="mb-8 text-lg text-white/90 md:text-xl max-w-xl">
            Disfruta de los mejores mariscos y pescados de la "Reserva Natural Marítima de los Miñarzos" y "Costa da Morte" acompañados de una exquisita selección de vinos de alta gama.
          </p>
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 justify-center md:justify-start">
            <Button 
              className="bg-wine-600 hover:bg-wine-700 text-white py-6 px-8 rounded-md font-medium transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
              size="lg"
            >
              Explorar Menú
            </Button>
            <Button 
              className="bg-transparent hover:bg-white/10 text-white border border-white/60 py-6 px-8 rounded-md font-medium transition-all"
              variant="outline"
              size="lg"
              asChild
            >
              <a href="#reservar">Reservar Mesa</a>
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent z-10"></div>
    </div>
  );
};

export default Hero;
