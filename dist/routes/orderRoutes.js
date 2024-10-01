"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routes/orderRoutes.ts
const express_1 = require("express");
const orderController_1 = __importDefault(require("../controllers/orderController"));
const router = (0, express_1.Router)();
// Obtener todas las órdenes
router.get('/', orderController_1.default.getOrders);
// Crear una nueva orden
router.post('/', orderController_1.default.createOrder);
// Obtener una orden por ID
router.get('/:id', orderController_1.default.getOrderById);
// Actualizar una orden
router.put('/:id', orderController_1.default.updateOrder);
// Eliminar una orden
router.delete('/:id', orderController_1.default.deleteOrder);
exports.default = router;
