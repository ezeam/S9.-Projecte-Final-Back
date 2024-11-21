"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const appointmentController_1 = require("../controllers/appointmentController");
const router = (0, express_1.Router)();
// Ruta para obtener las fechas disponibles
router.get('/dates', appointmentController_1.getDates);
// Ruta para obtener las horas disponibles para una fecha seleccionada
router.get('/times/:date', appointmentController_1.getTimes);
// Ruta para reservar una cita
router.post('/book', appointmentController_1.book);
exports.default = router;
