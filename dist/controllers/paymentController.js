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
Object.defineProperty(exports, "__esModule", { value: true });
const payment_1 = require("../models/payment");
class PaymentController {
    // Obtener todos los pagos
    getPayments(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const payments = yield payment_1.Payment.findAll();
                res.json(payments);
            }
            catch (error) {
                res.status(500).json({ message: 'Error al obtener los pagos', error });
            }
        });
    }
    // Crear un nuevo pago
    createPayment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newPayment = yield payment_1.Payment.create(req.body);
                res.status(201).json(newPayment);
            }
            catch (error) {
                res.status(500).json({ message: 'Error al crear el pago', error });
            }
        });
    }
    // Obtener un pago por ID
    getPaymentById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const payment = yield payment_1.Payment.findByPk(id);
                if (payment) {
                    res.json(payment);
                }
                else {
                    res.status(404).json({ message: 'Pago no encontrado' });
                }
            }
            catch (error) {
                res.status(500).json({ message: 'Error al obtener el pago', error });
            }
        });
    }
    // Actualizar un pago
    updatePayment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const [updated] = yield payment_1.Payment.update(req.body, {
                    where: { id_payment: id },
                });
                if (updated) {
                    const updatedPayment = yield payment_1.Payment.findByPk(id);
                    res.json(updatedPayment);
                }
                else {
                    res.status(404).json({ message: 'Pago no encontrado' });
                }
            }
            catch (error) {
                res.status(500).json({ message: 'Error al actualizar el pago', error });
            }
        });
    }
    // Eliminar un pago
    deletePayment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const deleted = yield payment_1.Payment.destroy({
                    where: { id_payment: id },
                });
                if (deleted) {
                    res.status(204).send();
                }
                else {
                    res.status(404).json({ message: 'Pago no encontrado' });
                }
            }
            catch (error) {
                res.status(500).json({ message: 'Error al eliminar el pago', error });
            }
        });
    }
}
exports.default = new PaymentController();
