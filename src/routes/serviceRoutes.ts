import { Router } from 'express';
import serviceController from '../controllers/serviceController'; // Importar como default

const router = Router();

// Rutas para servicios
router.post('/', serviceController.createService); // Crear un nuevo servicio
router.get('/', serviceController.getServices); // Obtener todos los servicios
router.get('/:id', serviceController.getServiceById); // Obtener un servicio por ID
router.put('/:id', serviceController.updateService); // Actualizar un servicio por ID
router.delete('/:id', serviceController.deleteService); // Eliminar un servicio por ID

export default router;
