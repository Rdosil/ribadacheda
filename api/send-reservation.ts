import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

// Configuración del transportador de correo
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

type ReservationData = {
  name: string;
  email: string;
  date: string;
  time: string;
  guests: number;
  phone: string;
  notes?: string;
};

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, email, date, time, guests, phone, notes }: ReservationData = req.body;

    // Email al restaurante
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: 'ribadacheda@gmail.com',
      subject: `Nueva reserva: ${name} - ${guests} personas - ${date} ${time}`,
      html: `
        <h2>Nueva Solicitud de Reserva</h2>
        <p><strong>Cliente:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Teléfono:</strong> ${phone}</p>
        <p><strong>Fecha:</strong> ${date}</p>
        <p><strong>Hora:</strong> ${time}</p>
        <p><strong>Personas:</strong> ${guests}</p>
        ${notes ? `<p><strong>Notas:</strong> ${notes}</p>` : ''}
        <hr>
        <p>
          <a href="mailto:${email}?subject=Confirmación reserva ${date} ${time}&body=Estimado/a ${name},%0D%0A%0D%0AConfirmamos su reserva para ${guests} personas el día ${date} a las ${time}.%0D%0A%0D%0AGracias por elegir Riba da Cheda.%0D%0A%0D%0ASaludos cordiales.">Confirmar Reserva</a>
          |
          <a href="mailto:${email}?subject=Cancelación reserva ${date} ${time}&body=Estimado/a ${name},%0D%0A%0D%0ALamentamos informarle que no podemos atender su reserva para el día ${date} a las ${time}.%0D%0A%0D%0AEsperamos poder atenderle en otra ocasión.%0D%0A%0D%0ASaludos cordiales.">Cancelar Reserva</a>
        </p>
      `,
    });

    // Email automático al cliente
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: email,
      subject: 'Solicitud de reserva recibida - Riba da Cheda',
      html: `
        <h2>Gracias por su solicitud de reserva</h2>
        <p>Estimado/a ${name},</p>
        <p>Hemos recibido su solicitud de reserva con los siguientes detalles:</p>
        <ul>
          <li>Fecha: ${date}</li>
          <li>Hora: ${time}</li>
          <li>Personas: ${guests}</li>
        </ul>
        <p>En breve recibirá un email de confirmación.</p>
        <p>Si necesita modificar o cancelar su reserva, por favor contáctenos respondiendo a este email.</p>
        <br>
        <p>Saludos cordiales,</p>
        <p>Restaurante Vinoteca Riba da Cheda</p>
      `,
    });

    res.status(200).json({ message: 'Reserva enviada correctamente' });
  } catch (error) {
    console.error('Error al enviar el email:', error);
    res.status(500).json({ message: 'Error al procesar la reserva' });
  }
} 