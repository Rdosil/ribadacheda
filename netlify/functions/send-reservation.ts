import { Handler } from '@netlify/functions';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

const handler: Handler = async (event) => {
  // Añadir headers CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Manejar preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    if (!event.body) {
      throw new Error('No body provided');
    }

    const { name, email, date, time, guests, phone, notes } = JSON.parse(event.body);

    // Validar datos requeridos
    if (!name || !email || !date || !time || !guests || !phone) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing required fields' })
      };
    }

    await Promise.all([
      sgMail.send({
        to: 'ribadacheda@gmail.com',
        from: process.env.SENDGRID_VERIFIED_SENDER || '',
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
        `
      }),
      sgMail.send({
        to: email,
        from: process.env.SENDGRID_VERIFIED_SENDER || '',
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
        `
      })
    ]);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, message: 'Reserva enviada correctamente' })
    };

  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        success: false, 
        error: 'Error al procesar la reserva',
        details: error instanceof Error ? error.message : 'Unknown error'
      })
    };
  }
};

export { handler }; 