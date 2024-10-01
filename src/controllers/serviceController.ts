import { Request, Response } from 'express';
import Service from '../models/service';

const serviceController = {
  // Obtener todos los servicios
  getServices: async (req: Request, res: Response) => {
    try {
      const services = await Service.findAll();
      res.json(services);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener los servicios', error });
    }
  },

  // Crear un nuevo servicio
  createService: async (req: Request, res: Response) => {
    try {
      const newService = await Service.create(req.body);
      res.status(201).json(newService);
    } catch (error) {
      res.status(500).json({ message: 'Error al crear el servicio', error });
    }
  },

  // Obtener un servicio por ID
  getServiceById: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const service = await Service.findByPk(id);
      if (service) {
        res.json(service);
      } else {
        res.status(404).json({ message: 'Servicio no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener el servicio', error });
    }
  },

  // Actualizar un servicio
  updateService: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const [updated] = await Service.update(req.body, {
        where: { id_service: id },
      });
      if (updated) {
        const updatedService = await Service.findByPk(id);
        res.json(updatedService);
      } else {
        res.status(404).json({ message: 'Servicio no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar el servicio', error });
    }
  },

  // Eliminar un servicio
  deleteService: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const deleted = await Service.destroy({
        where: { id_service: id },
      });
      if (deleted) {
        res.status(204).send();
      } else {
        res.status(404).json({ message: 'Servicio no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar el servicio', error });
    }
  },
};

export default serviceController; // Exportar el objeto como default
