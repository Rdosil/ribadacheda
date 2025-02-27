
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import ConsultarReserva from './pages/ConsultarReserva';
import AdminReservas from './pages/AdminReservas';
import { Toaster } from 'sonner';
import './App.css';

function App() {
  return (
    <Router>
      <Toaster position="top-right" richColors closeButton />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/consultar-reserva" element={<ConsultarReserva />} />
        <Route path="/admin-reservas" element={<AdminReservas />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
