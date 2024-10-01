// routes/orderRoutes.ts
import { Router } from 'express';
import OrderController from '../controllers/orderController';

const router = Router();

// Obtener todas las órdenes
router.get('/', OrderController.getOrders);

// Crear una nueva orden
router.post('/', OrderController.createOrder);

// Obtener una orden por ID
router.get('/:id', OrderController.getOrderById);

// Actualizar una orden
router.put('/:id', OrderController.updateOrder);

// Eliminar una orden
router.delete('/:id', OrderController.deleteOrder);

export default router;
