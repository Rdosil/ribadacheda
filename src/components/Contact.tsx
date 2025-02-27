
import React, { useRef, useEffect } from 'react';

const Contact = () => {
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
    <section id="contacto" className="py-20 bg-white" ref={sectionRef}>
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          {/* Map */}
          <div className="mt-6 rounded-xl overflow-hidden shadow-elegant h-96 animate-on-scroll">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11708.41705426348!2d-9.13142765!3d42.8385115!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd2f44a00e9cb639%3A0xb4c703ecd7c8f86a!2sLari%C3%B1o%2C%20A%20Coru%C3%B1a!5e0!3m2!1ses!2ses!4v1663933443843!5m2!1ses!2ses" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación de Restaurante Vinoteca Riba da Cheda"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
