import { Router } from 'express';
import { getDates, getTimes, book } from '../controllers/appointmentController';

const router = Router();

// Ruta para obtener las fechas disponibles
router.get('/dates', getDates);

// Ruta para obtener las horas disponibles para una fecha seleccionada
router.get('/times/:date', getTimes);

// Ruta para reservar una cita
router.post('/book', book);

export default router;


