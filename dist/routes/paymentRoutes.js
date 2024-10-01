"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routes/paymentRoutes.ts
const express_1 = require("express");
const paymentController_1 = __importDefault(require("../controllers/paymentController"));
const router = (0, express_1.Router)();
// Obtener todos los pagos
router.get('/', paymentController_1.default.getPayments);
// Crear un nuevo pago
router.post('/', paymentController_1.default.createPayment);
// Obtener un pago por ID
router.get('/:id', paymentController_1.default.getPaymentById);
// Actualizar un pago
router.put('/:id', paymentController_1.default.updatePayment);
// Eliminar un pago
router.delete('/:id', paymentController_1.default.deletePayment);
exports.default = router;
