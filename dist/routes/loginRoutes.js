"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const loginController_1 = require("../controllers/loginController"); // Asegúrate de que la ruta es correcta
const router = (0, express_1.Router)();
// Ruta para el login
router.post('/login', loginController_1.loginUser);
exports.default = router;
