import express, { Request, Response } from 'express';
import orderController from '../controllers/orderController';

const router = express.Router();

// Crear una nueva orden
router.post('/create', orderController.createOrder); 

// Obtener todas las órdenes
router.get('/', orderController.getOrders);

// Obtener una orden por ID
router.get('/:id', orderController.getOrderById);

// Actualizar una orden
router.put('/:id/update', orderController.updateOrder);

// Eliminar una orden
router.delete('/:id', orderController.deleteOrder);

export default router;
