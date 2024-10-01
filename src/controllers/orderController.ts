// controllers/OrderController.ts
import { Request, Response } from 'express';
import Order from '../models/order';

class orderController {
  // Obtener todas las órdenes
  public async getOrders(req: Request, res: Response) {
    try {
      const orders = await Order.findAll();
      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener las órdenes', error });
    }
  }

  // Crear una nueva orden
  public async createOrder(req: Request, res: Response) {
    try {
      const newOrder = await Order.create(req.body);
      res.status(201).json(newOrder);
    } catch (error) {
      res.status(500).json({ message: 'Error al crear la orden', error });
    }
  }

  // Obtener una orden por ID
  public async getOrderById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const order = await Order.findByPk(id);
      if (order) {
        res.json(order);
      } else {
        res.status(404).json({ message: 'Orden no encontrada' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener la orden', error });
    }
  }

  // Actualizar una orden
  public async updateOrder(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const [updated] = await Order.update(req.body, {
        where: { id_order: id },
      });
      if (updated) {
        const updatedOrder = await Order.findByPk(id);
        res.json(updatedOrder);
      } else {
        res.status(404).json({ message: 'Orden no encontrada' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar la orden', error });
    }
  }

  // Eliminar una orden
  public async deleteOrder(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const deleted = await Order.destroy({
        where: { id_order: id },
      });
      if (deleted) {
        res.status(204).send();
      } else {
        res.status(404).json({ message: 'Orden no encontrada' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar la orden', error });
    }
  }
}

export default new orderController();
