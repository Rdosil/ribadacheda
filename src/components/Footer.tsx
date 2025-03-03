import React from 'react';
import { Wine, MapPin, Phone, Mail, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#1a1a1a] text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Información de contacto */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-4">Contacto</h3>
            <div className="flex items-center space-x-2">
              <MapPin className="w-5 h-5" />
              <p className="text-sm">Lariño 362 Carnota, 15292, A Coruña</p>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="w-5 h-5" />
              <p className="text-sm">636 48 83 37</p>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="w-5 h-5" /> 
              <p className="text-sm">ribadacheda@gmail.com</p>
            </div>
          </div>

          {/* Horario */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-4">Horario</h3>
            <div className="space-y-2 text-sm">
              <p className="flex justify-between">
                <span>Lunes - Viernes:</span>
                <span>12:00 - 00:00</span>
              </p>
              <p className="flex justify-between">
                <span>Sábado:</span>
                <span>12:00 - 01:00</span>
              </p>
              <p className="flex justify-between">
                <span>Domingo:</span>
                <span>12:00 - 17:00</span>
              </p>
            </div>
          </div>

          {/* Redes Sociales */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-4">Síguenos</h3>
            <div className="flex space-x-4">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-gray-400 transition-colors"
              >
                <Facebook className="w-6 h-6" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-gray-400 transition-colors"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-gray-400 transition-colors"
              >
                <Twitter className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-4 border-t border-gray-700 text-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Riba da Cheda. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
