"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = __importDefault(require("../models/order"));
class orderController {
    // Obtener todas las órdenes
    getOrders(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orders = yield order_1.default.findAll();
                res.json(orders);
            }
            catch (error) {
                res.status(500).json({ message: 'Error al obtener las órdenes', error });
            }
        });
    }
    // Crear una nueva orden
    createOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newOrder = yield order_1.default.create(req.body);
                res.status(201).json(newOrder);
            }
            catch (error) {
                res.status(500).json({ message: 'Error al crear la orden', error });
            }
        });
    }
    // Obtener una orden por ID
    getOrderById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const order = yield order_1.default.findByPk(id);
                if (order) {
                    res.json(order);
                }
                else {
                    res.status(404).json({ message: 'Orden no encontrada' });
                }
            }
            catch (error) {
                res.status(500).json({ message: 'Error al obtener la orden', error });
            }
        });
    }
    // Actualizar una orden
    updateOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const [updated] = yield order_1.default.update(req.body, {
                    where: { id_order: id },
                });
                if (updated) {
                    const updatedOrder = yield order_1.default.findByPk(id);
                    res.json(updatedOrder);
                }
                else {
                    res.status(404).json({ message: 'Orden no encontrada' });
                }
            }
            catch (error) {
                res.status(500).json({ message: 'Error al actualizar la orden', error });
            }
        });
    }
    // Eliminar una orden
    deleteOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const deleted = yield order_1.default.destroy({
                    where: { id_order: id },
                });
                if (deleted) {
                    res.status(204).send();
                }
                else {
                    res.status(404).json({ message: 'Orden no encontrada' });
                }
            }
            catch (error) {
                res.status(500).json({ message: 'Error al eliminar la orden', error });
            }
        });
    }
}
exports.default = new orderController();
