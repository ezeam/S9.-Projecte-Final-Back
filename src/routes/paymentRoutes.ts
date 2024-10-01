// routes/paymentRoutes.ts
import { Router } from 'express';
import paymentController from '../controllers/paymentController';

const router = Router();

// Obtener todos los pagos
router.get('/', paymentController.getPayments);

// Crear un nuevo pago
router.post('/', paymentController.createPayment);

// Obtener un pago por ID
router.get('/:id', paymentController.getPaymentById);

// Actualizar un pago
router.put('/:id', paymentController.updatePayment);

// Eliminar un pago
router.delete('/:id', paymentController.deletePayment);

export default router;
