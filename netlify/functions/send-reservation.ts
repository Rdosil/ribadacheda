import { Handler } from '@netlify/functions';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method not allowed' })
    };
  }

  try {
    const { name, email, date, time, guests, phone, notes } = JSON.parse(event.body || '{}');

    await Promise.all([
      sgMail.send({
        to: 'ribadacheda@gmail.com',
        from: process.env.SENDGRID_VERIFIED_SENDER || '',
        subject: `Nueva reserva: ${name} - ${guests} personas - ${date} ${time}`,
        html: `...` // Tu HTML actual
      }),
      sgMail.send({
        to: email,
        from: process.env.SENDGRID_VERIFIED_SENDER || '',
        subject: 'Solicitud de reserva recibida - Riba da Cheda',
        html: `...` // Tu HTML actual
      })
    ]);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Reserva enviada correctamente' })
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error al procesar la reserva' })
    };
  }
};

export { handler }; 