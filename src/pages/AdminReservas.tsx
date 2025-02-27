
import React, { useState, useEffect } from 'react';
import { Check, Clock3, XCircle, Filter, Search, ChevronLeft, Eye, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Reservation, ReservationStatus } from '@/components/Reservation';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { toast } from 'sonner';

const AdminReservas = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState<ReservationStatus | 'all'>('all');
  const [searchText, setSearchText] = useState('');

  // En una implementación real, la autenticación se manejaría con el backend
  const adminPassword = 'ribadacheda2024'; // Esto es solo para demo

  useEffect(() => {
    if (authenticated) {
      loadReservations();
    }
  }, [authenticated]);

  const loadReservations = () => {
    setLoading(true);
    // Simulamos una petición al backend
    setTimeout(() => {
      try {
        const savedReservations = JSON.parse(localStorage.getItem('reservations') || '[]');
        const formattedReservations = savedReservations.map((res: any) => ({
          ...res,
          date: new Date(res.date),
          createdAt: new Date(res.createdAt)
        })).sort((a: Reservation, b: Reservation) => {
          // Primero las pendientes, luego por fecha (más recientes primero)
          if (a.status === ReservationStatus.PENDING && b.status !== ReservationStatus.PENDING) {
            return -1;
          }
          if (a.status !== ReservationStatus.PENDING && b.status === ReservationStatus.PENDING) {
            return 1;
          }
          return b.createdAt.getTime() - a.createdAt.getTime();
        });
        
        setReservations(formattedReservations);
      } catch (error) {
        console.error('Error al cargar reservas:', error);
        toast.error('Error al cargar las reservas');
      } finally {
        setLoading(false);
      }
    }, 1000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === adminPassword) {
      setAuthenticated(true);
      toast.success('Acceso concedido');
    } else {
      toast.error('Contraseña incorrecta');
    }
  };

  const handleApprove = (id: string) => {
    const updatedReservations = reservations.map(res => {
      if (res.id === id) {
        return { ...res, status: ReservationStatus.APPROVED };
      }
      return res;
    });
    
    setReservations(updatedReservations);
    localStorage.setItem('reservations', JSON.stringify(updatedReservations));
    toast.success('Reserva aprobada con éxito');
    
    // En una implementación real, aquí se enviaría el email al cliente
    console.log(`Email enviado a cliente sobre aprobación de reserva ID: ${id}`);
  };

  const handleReject = (id: string) => {
    setSelectedReservation(reservations.find(res => res.id === id) || null);
    setRejectionReason('');
    setShowModal(true);
  };

  const confirmReject = () => {
    if (!selectedReservation) return;
    
    const updatedReservations = reservations.map(res => {
      if (res.id === selectedReservation.id) {
        return { 
          ...res, 
          status: ReservationStatus.REJECTED,
          rejectionReason: rejectionReason || 'Sin disponibilidad en la fecha solicitada'
        };
      }
      return res;
    });
    
    setReservations(updatedReservations);
    localStorage.setItem('reservations', JSON.stringify(updatedReservations));
    toast.success('Reserva rechazada');
    setShowModal(false);
    
    // En una implementación real, aquí se enviaría el email al cliente
    console.log(`Email enviado a cliente sobre rechazo de reserva ID: ${selectedReservation.id}, razón: ${rejectionReason}`);
  };

  const filteredReservations = reservations
    .filter(res => filterStatus === 'all' || res.status === filterStatus)
    .filter(res => 
      searchText === '' || 
      res.name.toLowerCase().includes(searchText.toLowerCase()) ||
      res.email.toLowerCase().includes(searchText.toLowerCase()) ||
      res.phone.includes(searchText)
    );

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
        return 'Pendiente';
      case ReservationStatus.APPROVED:
        return 'Aprobada';
      case ReservationStatus.REJECTED:
        return 'Rechazada';
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

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Acceso a Administración
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Introduce la contraseña para acceder al panel de administración de reservas
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="password" className="sr-only">Contraseña</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="form-input rounded-md"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <Button
                type="submit"
                className="w-full bg-wine-600 hover:bg-wine-700 text-white py-6"
              >
                Acceder
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20 bg-sand-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex justify-between items-center">
          <Button
            variant="ghost"
            className="text-gray-600 hover:text-gray-900"
            onClick={() => window.location.href = "/"}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Volver a la página principal
          </Button>
          <Button
            variant="outline"
            className="text-gray-700"
            onClick={() => {
              setAuthenticated(false);
              setPassword('');
            }}
          >
            Cerrar sesión
          </Button>
        </div>
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 bg-wine-700 text-white">
            <h1 className="text-2xl font-bold">Panel de Administración de Reservas</h1>
            <p className="text-white/80">Gestiona las solicitudes de reserva del restaurante</p>
          </div>
          
          <div className="p-6">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
              <div className="relative flex-1 w-full sm:max-w-xs">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="form-input pl-10 w-full"
                  placeholder="Buscar por nombre, email o teléfono"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>
              
              <div className="flex items-center space-x-2 w-full sm:w-auto">
                <Filter className="h-5 w-5 text-gray-400" />
                <select
                  className="form-input"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value as ReservationStatus | 'all')}
                >
                  <option value="all">Todas</option>
                  <option value={ReservationStatus.PENDING}>Pendientes</option>
                  <option value={ReservationStatus.APPROVED}>Aprobadas</option>
                  <option value={ReservationStatus.REJECTED}>Rechazadas</option>
                </select>
                
                <Button 
                  variant="outline"
                  onClick={loadReservations}
                >
                  Actualizar
                </Button>
              </div>
            </div>
            
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-wine-700 mx-auto"></div>
                <p className="mt-4 text-gray-600">Cargando reservas...</p>
              </div>
            ) : filteredReservations.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <XCircle className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-lg font-medium text-gray-900">No hay reservas</h3>
                <p className="mt-1 text-gray-500">
                  {searchText || filterStatus !== 'all' 
                    ? 'No se encontraron reservas con los filtros aplicados' 
                    : 'Aún no se han realizado reservas'}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Reserva
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Fecha y Hora
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Contacto
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Estado
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredReservations.map((reservation) => (
                      <tr key={reservation.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {reservation.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                {reservation.guests} {reservation.guests === 1 ? 'persona' : 'personas'}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{format(reservation.date, "dd/MM/yyyy", { locale: es })}</div>
                          <div className="text-sm text-gray-500">{reservation.time}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{reservation.email}</div>
                          <div className="text-sm text-gray-500">{reservation.phone}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(reservation.status)}`}>
                            {getStatusIcon(reservation.status)}
                            <span className="ml-1">{getStatusText(reservation.status)}</span>
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          {reservation.status === ReservationStatus.PENDING ? (
                            <div className="flex justify-end space-x-2">
                              <Button 
                                size="sm"
                                variant="outline"
                                className="text-green-700 bg-green-50 hover:bg-green-100 border-green-200"
                                onClick={() => handleApprove(reservation.id)}
                              >
                                <Check className="mr-1 h-4 w-4" />
                                Aprobar
                              </Button>
                              <Button 
                                size="sm"
                                variant="outline"
                                className="text-red-700 bg-red-50 hover:bg-red-100 border-red-200"
                                onClick={() => handleReject(reservation.id)}
                              >
                                <XCircle className="mr-1 h-4 w-4" />
                                Rechazar
                              </Button>
                            </div>
                          ) : (
                            <Button 
                              size="sm"
                              variant="ghost"
                              className="text-gray-700 hover:text-gray-900"
                              onClick={() => {
                                setSelectedReservation(reservation);
                                setShowModal(true);
                              }}
                            >
                              <Eye className="mr-1 h-4 w-4" />
                              Ver detalles
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal para rechazar o ver detalles */}
      {showModal && selectedReservation && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-wine-100 sm:mx-0 sm:h-10 sm:w-10">
                    {selectedReservation.status === ReservationStatus.PENDING ? (
                      <XCircle className="h-6 w-6 text-wine-600" />
                    ) : (
                      <Eye className="h-6 w-6 text-wine-600" />
                    )}
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      {selectedReservation.status === ReservationStatus.PENDING ? 
                        'Rechazar reserva' : 
                        'Detalles de la reserva'
                      }
                    </h3>
                    <div className="mt-4">
                      <div className="grid grid-cols-1 gap-4">
                        <div className="bg-gray-50 rounded-lg p-4">
                          <p className="text-sm font-medium text-gray-500">Cliente:</p>
                          <p className="font-medium">{selectedReservation.name}</p>
                          
                          <div className="mt-2 grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm font-medium text-gray-500">Fecha:</p>
                              <p>{format(selectedReservation.date, "dd/MM/yyyy", { locale: es })}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">Hora:</p>
                              <p>{selectedReservation.time}</p>
                            </div>
                          </div>
                          
                          <div className="mt-2 grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm font-medium text-gray-500">Email:</p>
                              <p className="text-sm">{selectedReservation.email}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">Teléfono:</p>
                              <p>{selectedReservation.phone}</p>
                            </div>
                          </div>
                          
                          <div className="mt-2">
                            <p className="text-sm font-medium text-gray-500">Personas:</p>
                            <p>{selectedReservation.guests}</p>
                          </div>
                          
                          {selectedReservation.notes && (
                            <div className="mt-2">
                              <p className="text-sm font-medium text-gray-500">Observaciones:</p>
                              <p className="text-sm text-gray-700">{selectedReservation.notes}</p>
                            </div>
                          )}
                          
                          {selectedReservation.status === ReservationStatus.REJECTED && selectedReservation.rejectionReason && (
                            <div className="mt-2">
                              <p className="text-sm font-medium text-gray-500">Motivo de rechazo:</p>
                              <p className="text-sm text-red-600">{selectedReservation.rejectionReason}</p>
                            </div>
                          )}
                        </div>
                        
                        {selectedReservation.status === ReservationStatus.PENDING && (
                          <div>
                            <label htmlFor="rejection-reason" className="block text-sm font-medium text-gray-700 mb-1">
                              Motivo del rechazo
                            </label>
                            <textarea
                              id="rejection-reason"
                              className="form-input min-h-[100px]"
                              placeholder="Indique el motivo por el que rechaza la reserva"
                              value={rejectionReason}
                              onChange={(e) => setRejectionReason(e.target.value)}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                {selectedReservation.status === ReservationStatus.PENDING ? (
                  <React.Fragment>
                    <Button
                      className="bg-red-600 hover:bg-red-700 text-white w-full sm:ml-3 sm:w-auto"
                      onClick={confirmReject}
                    >
                      Confirmar Rechazo
                    </Button>
                    <Button
                      variant="outline"
                      className="mt-3 w-full sm:mt-0 sm:w-auto"
                      onClick={() => setShowModal(false)}
                    >
                      Cancelar
                    </Button>
                  </React.Fragment>
                ) : (
                  <Button
                    className="w-full sm:ml-3 sm:w-auto"
                    onClick={() => setShowModal(false)}
                  >
                    Cerrar
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminReservas;
