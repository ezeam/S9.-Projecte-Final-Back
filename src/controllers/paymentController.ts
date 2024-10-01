// controllers/PaymentController.ts
import { Request, Response } from 'express';
import Payment from '../models/payment';

class PaymentController {
  // Obtener todos los pagos
  public async getPayments(req: Request, res: Response) {
    try {
      const payments = await Payment.findAll();
      res.json(payments);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener los pagos', error });
    }
  }

  // Crear un nuevo pago
  public async createPayment(req: Request, res: Response) {
    try {
      const newPayment = await Payment.create(req.body);
      res.status(201).json(newPayment);
    } catch (error) {
      res.status(500).json({ message: 'Error al crear el pago', error });
    }
  }

  // Obtener un pago por ID
  public async getPaymentById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const payment = await Payment.findByPk(id);
      if (payment) {
        res.json(payment);
      } else {
        res.status(404).json({ message: 'Pago no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener el pago', error });
    }
  }

  // Actualizar un pago
  public async updatePayment(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const [updated] = await Payment.update(req.body, {
        where: { id_payment: id },
      });
      if (updated) {
        const updatedPayment = await Payment.findByPk(id);
        res.json(updatedPayment);
      } else {
        res.status(404).json({ message: 'Pago no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar el pago', error });
    }
  }

  // Eliminar un pago
  public async deletePayment(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const deleted = await Payment.destroy({
        where: { id_payment: id },
      });
      if (deleted) {
        res.status(204).send();
      } else {
        res.status(404).json({ message: 'Pago no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar el pago', error });
    }
  }
}

export default new PaymentController();
