import { Request, Response } from 'express';
import Order from '../models/order'; // Cambia la importación a la correcta

class orderController { // Cambia a PascalCase
  // Obtener todas las órdenes
  public async getOrders(req: Request, res: Response) {
    try {
      const orders = await Order.findAll({ include: ['User', 'Service'] }); // Incluye relaciones
      res.json(orders);
    } catch (error) {
      console.error(error); // Muestra el error en la consola
      res.status(500).json({ message: 'Error al obtener las órdenes' });
    }
  }

  // Crear una nueva orden
  public async createOrder(req: Request, res: Response) {
    try {
      const newOrder = await Order.create(req.body);
      res.status(201).json(newOrder);
    } catch (error) {
      console.error(error); // Muestra el error en la consola
      res.status(500).json({ message: 'Error al crear la orden' });
    }
  }

  // Obtener una orden por ID
  public async getOrderById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const order = await Order.findByPk(id, { include: ['User', 'Service'] }); // Incluye relaciones
      if (order) {
        res.json(order);
      } else {
        res.status(404).json({ message: 'Orden no encontrada' });
      }
    } catch (error) {
      console.error(error); // Muestra el error en la consola
      res.status(500).json({ message: 'Error al obtener la orden' });
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
      console.error(error); // Muestra el error en la consola
      res.status(500).json({ message: 'Error al actualizar la orden' });
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
      console.error(error); // Muestra el error en la consola
      res.status(500).json({ message: 'Error al eliminar la orden' });
    }
  }


}


export default new orderController(); // Asegúrate de exportar la instancia
