"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const orderController_1 = __importDefault(require("../controllers/orderController"));
const router = express_1.default.Router();
// Crear una nueva orden
router.post('/create', orderController_1.default.createOrder);
// Obtener todas las órdenes
router.get('/', orderController_1.default.getOrders);
// Obtener una orden por ID
router.get('/:id', orderController_1.default.getOrderById);
// Actualizar una orden
router.put('/:id/update', orderController_1.default.updateOrder);
// Eliminar una orden
router.delete('/:id', orderController_1.default.deleteOrder);
exports.default = router;
