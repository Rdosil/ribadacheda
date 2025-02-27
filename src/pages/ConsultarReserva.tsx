
import React, { useState, useEffect } from 'react';
import { Check, Clock3, XCircle, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Reservation, ReservationStatus } from '@/components/Reservation';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const ConsultarReserva = () => {
  const [email, setEmail] = useState('');
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  // Función para obtener reservas por email
  const getReservationsByEmail = (email: string): Reservation[] => {
    try {
      const allReservations = JSON.parse(localStorage.getItem('reservations') || '[]');
      const filtered = allReservations
        .filter((res: any) => res.email.toLowerCase() === email.toLowerCase())
        .map((res: any) => ({
          ...res,
          date: new Date(res.date),
          createdAt: new Date(res.createdAt)
        }))
        .sort((a: Reservation, b: Reservation) => b.createdAt.getTime() - a.createdAt.getTime());
      
      return filtered;
    } catch (error) {
      console.error('Error al obtener reservas:', error);
      return [];
    }
  };

  // Efecto para obtener reservas desde la URL si hay un ID
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.hash.split('?')[1] || '');
    const id = queryParams.get('id');
    
    if (id) {
      try {
        const allReservations = JSON.parse(localStorage.getItem('reservations') || '[]');
        const reservation = allReservations.find((res: any) => res.id === id);
        
        if (reservation) {
          setEmail(reservation.email);
          handleSearch();
        }
      } catch (error) {
        console.error('Error al obtener reserva por ID:', error);
      }
    }
  }, []);

  const handleSearch = () => {
    if (!email) return;
    
    setLoading(true);
    
    // Simulamos una petición a un servidor
    setTimeout(() => {
      const results = getReservationsByEmail(email);
      setReservations(results);
      setLoading(false);
      setSearched(true);
    }, 1000);
  };

  // Función para obtener el icono según el estado
  const getStatusIcon = (status: ReservationStatus) => {
    switch (status) {
      case ReservationStatus.PENDING:
        return <Clock3 className="h-5 w-5 text-yellow-500" />;
      case ReservationStatus.APPROVED:
        return <Check className="h-5 w-5 text-green-500" />;
      case ReservationStatus.REJECTED:
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  // Función para obtener el texto según el estado
  const getStatusText = (status: ReservationStatus) => {
    switch (status) {
      case ReservationStatus.PENDING:
        return 'Pendiente de confirmación';
      case ReservationStatus.APPROVED:
        return 'Reserva confirmada';
      case ReservationStatus.REJECTED:
        return 'Reserva rechazada';
      default:
        return '';
    }
  };

  // Función para obtener la clase de color según el estado
  const getStatusClass = (status: ReservationStatus) => {
    switch (status) {
      case ReservationStatus.PENDING:
        return 'bg-yellow-50 text-yellow-800 border-yellow-200';
      case ReservationStatus.APPROVED:
        return 'bg-green-50 text-green-800 border-green-200';
      case ReservationStatus.REJECTED:
        return 'bg-red-50 text-red-800 border-red-200';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20 bg-sand-50">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <Button
            variant="ghost"
            className="mb-6 text-gray-600 hover:text-gray-900"
            onClick={() => window.history.back()}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Volver
          </Button>
          
          <div className="bg-white rounded-xl shadow-elegant p-8">
            <h1 className="text-3xl font-bold mb-6 text-gray-900 font-serif text-center">
              Consultar Estado de Reservas
            </h1>
            
            <div className="mb-10 max-w-xl mx-auto">
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Introduce tu correo electrónico"
                  className="form-input flex-1"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
                <Button
                  className="bg-wine-600 hover:bg-wine-700 text-white whitespace-nowrap"
                  onClick={handleSearch}
                  disabled={!email || loading}
                >
                  {loading ? 'Buscando...' : 'Buscar Reservas'}
                </Button>
              </div>
              <p className="text-sm text-gray-500 mt-2 text-center">
                Introduce el correo electrónico que utilizaste para hacer la reserva
              </p>
            </div>

            {searched && (
              <div>
                {reservations.length > 0 ? (
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                      Tus Reservas
                    </h2>
                    
                    {reservations.map((reservation) => (
                      <div 
                        key={reservation.id} 
                        className="border rounded-lg p-6 transition-all hover:shadow-md"
                      >
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                          <div>
                            <h3 className="font-semibold text-lg text-gray-900">
                              {reservation.name}
                            </h3>
                            <p className="text-gray-600">
                              {format(reservation.date, "PPPP", { locale: es })} • {reservation.time} • {reservation.guests} {reservation.guests === 1 ? 'persona' : 'personas'}
                            </p>
                          </div>
                          <div className={`mt-4 md:mt-0 flex items-center px-3 py-1 rounded-full border ${getStatusClass(reservation.status)}`}>
                            {getStatusIcon(reservation.status)}
                            <span className="ml-2 text-sm font-medium">
                              {getStatusText(reservation.status)}
                            </span>
                          </div>
                        </div>
                        
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-gray-500">Correo electrónico:</p>
                              <p className="font-medium">{reservation.email}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Teléfono:</p>
                              <p className="font-medium">{reservation.phone}</p>
                            </div>
                          </div>
                          
                          {reservation.notes && (
                            <div className="mt-4">
                              <p className="text-sm text-gray-500">Observaciones:</p>
                              <p className="text-gray-700">{reservation.notes}</p>
                            </div>
                          )}
                          
                          {reservation.status === ReservationStatus.REJECTED && reservation.rejectionReason && (
                            <div className="mt-4 p-3 bg-red-50 rounded-lg">
                              <p className="text-sm font-medium text-red-800">Motivo del rechazo:</p>
                              <p className="text-red-700">{reservation.rejectionReason}</p>
                            </div>
                          )}
                        </div>
                        
                        <p className="text-xs text-gray-500 mt-4">
                          Solicitada el {format(reservation.createdAt, "dd/MM/yyyy 'a las' HH:mm", { locale: es })}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <XCircle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron reservas</h3>
                    <p className="text-gray-600 mb-6">
                      No encontramos reservas asociadas a este correo electrónico. Por favor, verifica el correo o realiza una nueva reserva.
                    </p>
                    <Button 
                      className="bg-wine-600 hover:bg-wine-700 text-white"
                      onClick={() => window.location.href = "#reservar"}
                    >
                      Realizar una Reserva
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultarReserva;
