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
const service_1 = __importDefault(require("../models/service"));
const serviceController = {
    // Obtener todos los servicios
    getServices: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const services = yield service_1.default.findAll();
            res.json(services);
        }
        catch (error) {
            res.status(500).json({ message: 'Error al obtener los servicios', error });
        }
    }),
    // Crear un nuevo servicio
    createService: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const newService = yield service_1.default.create(req.body);
            res.status(201).json(newService);
        }
        catch (error) {
            res.status(500).json({ message: 'Error al crear el servicio', error });
        }
    }),
    // Obtener un servicio por ID
    getServiceById: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const service = yield service_1.default.findByPk(id);
            if (service) {
                res.json(service);
            }
            else {
                res.status(404).json({ message: 'Servicio no encontrado' });
            }
        }
        catch (error) {
            res.status(500).json({ message: 'Error al obtener el servicio', error });
        }
    }),
    // Actualizar un servicio
    updateService: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const [updated] = yield service_1.default.update(req.body, {
                where: { id_service: id },
            });
            if (updated) {
                const updatedService = yield service_1.default.findByPk(id);
                res.json(updatedService);
            }
            else {
                res.status(404).json({ message: 'Servicio no encontrado' });
            }
        }
        catch (error) {
            res.status(500).json({ message: 'Error al actualizar el servicio', error });
        }
    }),
    // Eliminar un servicio
    deleteService: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const deleted = yield service_1.default.destroy({
                where: { id_service: id },
            });
            if (deleted) {
                res.status(204).send();
            }
            else {
                res.status(404).json({ message: 'Servicio no encontrado' });
            }
        }
        catch (error) {
            res.status(500).json({ message: 'Error al eliminar el servicio', error });
        }
    }),
};
exports.default = serviceController; // Exportar el objeto como default
