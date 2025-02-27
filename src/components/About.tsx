
import React, { useEffect, useRef } from 'react';

const About = () => {
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
    <section id="sobre-nosotros" ref={sectionRef} className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block px-3 py-1 mb-4 text-xs font-medium tracking-wider text-wine-700 uppercase bg-wine-50 rounded-full">
            Nuestra Filosofía
          </span>
          <h2 className="text-3xl font-bold mb-6 text-gray-900 font-serif md:text-4xl">
            Restaurante Vinoteca Riba da Cheda
          </h2>
          <div className="w-20 h-1 bg-wine-500 mx-auto mb-6"></div>
          <p className="text-gray-600 leading-relaxed animate-on-scroll">
            En Restaurante Vinoteca Riba da Cheda, te ofrecemos un viaje gastronómico a través de los sabores del mar. Nos especializamos en la selección de los mariscos y pescados más exclusivos respetando su temporada y el momento óptimo de consumo. Creemos en la alimentación consciente y nutritiva, buscando siempre los mejores productos para una dieta equilibrada y respetuosa con las especies y el medio ambiente.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative overflow-hidden rounded-xl shadow-elegant animate-on-scroll" style={{ height: '480px' }}>
            <img 
              src="/images/restaurant-1.jpg" 
              alt="Interior del restaurante" 
              className="object-cover w-full h-full transition-transform duration-700 hover:scale-105"
            />
          </div>
          <div className="flex flex-col justify-center space-y-6 animate-on-scroll" style={{ transitionDelay: '0.2s' }}>
            <h3 className="text-2xl font-semibold text-gray-900 font-serif">Una experiencia culinaria única</h3>
            <p className="text-gray-600">
              Nuestra pasión por la gastronomía gallega y el respeto por las tradiciones culinarias nos impulsa a crear platos que celebran la riqueza del mar y la tierra gallega.
            </p>
            <p className="text-gray-600">
              Cada ingrediente que seleccionamos cuenta una historia de sostenibilidad y respeto al entorno natural de la Costa da Morte, permitiéndonos ofrecer a nuestros comensales una experiencia gastronómica auténtica y memorable.
            </p>
            <div className="pt-4">
              <a 
                href="#reservar" 
                className="inline-flex items-center text-wine-600 font-medium hover:text-wine-800 transition-colors"
              >
                Reserva tu experiencia
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
