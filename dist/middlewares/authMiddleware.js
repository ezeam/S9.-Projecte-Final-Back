"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']; // Obtener el token del header
    const token = authHeader && authHeader.split(' ')[1]; // Extraer el token del formato "Bearer token"
    if (!token) {
        return res.status(401).json({ msg: 'No token provided, unauthorized' });
    }
    // Verificar el token
    jsonwebtoken_1.default.verify(token, 'tu_clave_secreta', (err, user) => {
        if (err) {
            return res.status(403).json({ msg: 'Invalid token, unauthorized' });
        }
        // Adjuntar el user_id al objeto req para que esté disponible en los controladores
        req.user = user; // user contiene { id: user.id_user, email: user.email } del token
        next(); // Continuar con la siguiente función
    });
};
exports.authenticateToken = authenticateToken;
