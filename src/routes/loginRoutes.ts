import { Router } from 'express';
import { loginUser } from '../controllers/loginController'; // Asegúrate de que la ruta es correcta

const router = Router();

// Ruta para el login
router.post('/login', loginUser);

export default router;
