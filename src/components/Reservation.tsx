import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { CalendarIcon, Clock, Mail } from 'lucide-react';
import { toast } from 'sonner';

const timeSlots = [
  '13:00', '13:30', '14:00', '14:30', '15:00', 
  '20:00', '20:30', '21:00', '21:30', '22:00'
];

const ReservationComponent = () => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState<string | undefined>(undefined);
  const [guests, setGuests] = useState(2);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const restaurantEmail = 'ribadacheda@gmail.com';
  
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date || !time || !name || !email || !phone) {
      toast.error('Por favor complete todos los campos obligatorios');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Formato de la fecha
      const formattedDate = format(date, "EEEE, dd 'de' MMMM 'de' yyyy", { locale: es });
      
      const response = await fetch('/api/send-reservation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          date: formattedDate,
          time,
          guests,
          phone,
          notes
        }),
      });

      if (!response.ok) {
        throw new Error('Error al enviar la reserva');
      }

      // Guardamos la reserva en localStorage solo para referencia
      const reservationData = {
        id: `res_${Date.now()}`,
        date,
        time,
        guests,
        name,
        email,
        phone,
        notes: notes || undefined,
        createdAt: new Date()
      };
      
      const reservations = JSON.parse(localStorage.getItem('reservations') || '[]');
      reservations.push(reservationData);
      localStorage.setItem('reservations', JSON.stringify(reservations));
      
      setIsSubmitting(false);
      setShowSuccess(true);
      
      // Limpiamos el formulario
      setDate(undefined);
      setTime(undefined);
      setGuests(2);
      setName('');
      setEmail('');
      setPhone('');
      setNotes('');

      toast.success('Solicitud de reserva enviada correctamente');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error al enviar la reserva. Por favor, inténtelo de nuevo.');
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setShowSuccess(false);
  };

  return (
    <section id="reservar" className="py-20 bg-sand-50" ref={sectionRef}>
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16 animate-on-scroll">
          <span className="inline-block px-3 py-1 mb-4 text-xs font-medium tracking-wider text-wine-700 uppercase bg-white rounded-full">
            Reserva tu Mesa
          </span>
          <h2 className="text-3xl font-bold mb-6 text-gray-900 font-serif md:text-4xl">
            Vive la Experiencia Riba da Cheda
          </h2>
          <div className="w-20 h-1 bg-wine-500 mx-auto mb-6"></div>
          <p className="text-gray-600 leading-relaxed">
            Reserva tu mesa y disfruta de una experiencia gastronómica única con los mejores pescados y mariscos de la Costa da Morte, acompañados de una selección exclusiva de vinos.
          </p>
        </div>

        {!showSuccess ? (
          <div className="bg-white rounded-xl shadow-elegant p-8 animate-on-scroll">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Nombre completo *
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="form-input"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Correo electrónico *
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="form-input"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Teléfono *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="form-input"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                      Observaciones
                    </label>
                    <textarea
                      id="notes"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="form-input min-h-[120px]"
                      placeholder="Alergias, intolerancias, celebraciones especiales..."
                    />
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Fecha *
                    </label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal bg-white"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP", { locale: es }) : <span>Selecciona fecha</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                          locale={es}
                          disabled={(date) => {
                            const now = new Date();
                            now.setHours(0, 0, 0, 0);
                            return date < now;
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Hora *
                    </label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal bg-white"
                        >
                          <Clock className="mr-2 h-4 w-4" />
                          {time ? time : <span>Selecciona hora</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-60">
                        <div className="grid grid-cols-2 gap-2 p-2">
                          {timeSlots.map((slot) => (
                            <Button
                              key={slot}
                              variant="outline"
                              className={`text-center ${time === slot ? 'bg-wine-100 border-wine-500 text-wine-800' : ''}`}
                              onClick={() => {
                                setTime(slot);
                                document.body.click(); // Close the popover
                              }}
                            >
                              {slot}
                            </Button>
                          ))}
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div>
                    <label htmlFor="guests" className="block text-sm font-medium text-gray-700 mb-1">
                      Número de personas *
                    </label>
                    <div className="flex items-center">
                      <Button
                        type="button"
                        variant="outline"
                        className="h-10 w-10 rounded-l-md"
                        onClick={() => setGuests(Math.max(1, guests - 1))}
                        disabled={guests <= 1}
                      >
                        -
                      </Button>
                      <input
                        type="number"
                        id="guests"
                        value={guests}
                        onChange={(e) => setGuests(parseInt(e.target.value) || 1)}
                        min="1"
                        max="20"
                        className="h-10 border-y border-gray-300 text-center w-16"
                        readOnly
                      />
                      <Button
                        type="button"
                        variant="outline"
                        className="h-10 w-10 rounded-r-md"
                        onClick={() => setGuests(Math.min(20, guests + 1))}
                        disabled={guests >= 20}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <Button
                      type="submit"
                      className="w-full bg-wine-600 hover:bg-wine-700 text-white py-6"
                      disabled={isSubmitting || !date || !time || !name || !email || !phone}
                    >
                      {isSubmitting ? 'Enviando...' : 'Solicitar Reserva'}
                    </Button>
                    <p className="text-xs text-gray-500 mt-2 text-center">
                      Al reservar aceptas nuestras políticas de reserva y cancelación
                    </p>
                  </div>
                </div>
              </div>
            </form>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-elegant p-8 animate-on-scroll">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                <Mail className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">¡Solicitud de reserva enviada!</h3>
              <p className="text-gray-600 mb-6">
                Tu solicitud de reserva ha sido enviada al restaurante. Se ha abierto tu cliente de correo para enviar los detalles. 
                Recibirás una respuesta por correo electrónico con la confirmación de tu reserva.
              </p>
              <Button 
                variant="outline" 
                onClick={resetForm}
                className="bg-wine-600 hover:bg-wine-700 text-white"
              >
                Realizar otra reserva
              </Button>
            </div>
          </div>
        )}

        {/* Instrucciones de reserva */}
        <div className="mt-12 max-w-3xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-sm">
            <h4 className="text-xl font-semibold text-gray-900 mb-4 text-center">Proceso de reserva</h4>
            <div className="space-y-4">
              <p className="text-gray-600">
                Para solicitar una reserva, simplemente completa el formulario anterior con tus datos y preferencias. 
                Nosotros te responderemos por correo electrónico tan pronto como sea posible para confirmar tu reserva.
              </p>
              <p className="text-gray-600">
                Si necesitas modificar o cancelar tu reserva, por favor responde al correo de confirmación o 
                contacta con nosotros directamente por teléfono al 636488337.
              </p>
              <p className="text-gray-600">
                Para cualquier consulta especial o reservas de grupos grandes (más de 10 personas), te recomendamos contactar 
                directamente por teléfono.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReservationComponent;
