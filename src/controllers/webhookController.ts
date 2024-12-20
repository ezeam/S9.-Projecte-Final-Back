import { Request, Response } from 'express';
import  Order  from '../models/order'; // Asegúrate de que está importado correctamente

export const webhookController = async (req: Request, res: Response) => {
  try {
    // Verifica si se recibe el webhook correctamente
    console.log('Webhook recibido:', JSON.stringify(req.body, null, 2));

    // Procesa el evento del webhook
    const eventType = req.body.event_type;
    const resource = req.body.resource;

    switch (eventType) {
      case 'PAYMENT.CAPTURE.COMPLETED':
        console.log('PAYMENT.CAPTURE.COMPLETED recibido');

        // Verifica que los datos necesarios existan en el cuerpo
        if (!resource.id || !resource.amount || !resource.payer) {
          console.error('Faltan datos en el recurso del webhook');
          return res.status(400).send('Datos incompletos en el webhook');
        }

        // Actualiza la orden con los datos del pago
        const updatedOrder = await Order.update(
          {
            external_transaction_id: resource.id,
            total_amount_order: resource.amount.value,
            payment_status: resource.status,
            payment_method: 'paypal', // Método fijo como 'paypal'
          },
          {
            where: { external_order_id: resource.invoice_id }, // Busca la orden por el invoice_id (ajústalo si es necesario)
          }
        );

        // Verifica si la orden se actualizó
        if (updatedOrder[0] === 0) {
          console.error('Orden no encontrada o no actualizada');
          return res.status(404).send('Orden no encontrada');
        }

        console.log('Orden actualizada correctamente:', updatedOrder);

        // Responde a PayPal con un 200 OK para confirmar que el webhook fue recibido
        return res.status(200).send('Webhook procesado correctamente');

      // Puedes manejar más eventos si es necesario
      default:
        console.log(`Tipo de evento no manejado: ${eventType}`);
        return res.status(200).send(`Evento no manejado: ${eventType}`);
    }
  } catch (error) {
    console.error('Error al procesar el evento:', error);
    return res.status(500).send('Error al procesar el evento');
  }
};
