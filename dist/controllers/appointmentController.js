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
exports.book = exports.getTimes = exports.getDates = void 0;
const appointment_1 = __importDefault(require("../models/appointment"));
// Obtener las fechas disponibles
const getDates = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dates = yield appointment_1.default.findAll({
            where: { is_available: true },
            attributes: ['appointmen_date'],
            group: ['appointmen_date'],
        });
        res.json(dates.map(date => date.appointmen_date));
    }
    catch (error) {
        res.status(500).json({ error: 'Error al obtener las fechas disponibles' });
    }
});
exports.getDates = getDates;
// Obtener las horas disponibles para una fecha
const getTimes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { date } = req.params;
    try {
        const times = yield appointment_1.default.findAll({
            where: { appointmen_date: date, is_available: true },
            attributes: ['appointmen_time'],
        });
        res.json(times.map(time => time.appointmen_time));
    }
    catch (error) {
        res.status(500).json({ error: 'Error al obtener las horas disponibles' });
    }
});
exports.getTimes = getTimes;
// Reservar una cita
const book = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { date, time } = req.body;
    try {
        const appointment = yield appointment_1.default.findOne({
            where: { appointmen_date: date, appointmen_time: time, is_available: true },
        });
        if (!appointment) {
            return res.status(400).json({ error: 'La hora seleccionada no está disponible' });
        }
        // Marcar la cita como no disponible
        appointment.is_available = false;
        yield appointment.save();
        res.status(200).json({ message: 'Cita reservada correctamente' });
    }
    catch (error) {
        res.status(500).json({ error: 'Error al reservar la cita' });
    }
});
exports.book = book;
