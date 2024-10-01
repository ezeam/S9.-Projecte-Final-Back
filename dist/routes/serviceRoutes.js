"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const serviceController_1 = __importDefault(require("../controllers/serviceController")); // Importar como default
const router = (0, express_1.Router)();
// Rutas para servicios
router.post('/', serviceController_1.default.createService); // Crear un nuevo servicio
router.get('/', serviceController_1.default.getServices); // Obtener todos los servicios
router.get('/:id', serviceController_1.default.getServiceById); // Obtener un servicio por ID
router.put('/:id', serviceController_1.default.updateService); // Actualizar un servicio por ID
router.delete('/:id', serviceController_1.default.deleteService); // Eliminar un servicio por ID
exports.default = router;
