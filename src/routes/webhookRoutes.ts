import express, { Request, Response } from 'express';
import { webhookController } from '../controllers/webhookController';

const router = express.Router();

router.post('/', webhookController); // La ruta POST del webhook

export default router;