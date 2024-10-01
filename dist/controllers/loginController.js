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
exports.loginUser = void 0;
const user_1 = __importDefault(require("../models/user")); // Ruta correcta al modelo User
const bcrypt_1 = __importDefault(require("bcrypt")); // Asegúrate de tener bcrypt instalado
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        // Buscar el usuario por email
        const user = yield user_1.default.findOne({ where: { email } }); // Asegúrate de usar el tipo User
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        // Verificar la contraseña
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ msg: 'Unauthorized: Please check your credentials (user / password) or try again later' });
        }
        // Generar un token
        const token = jsonwebtoken_1.default.sign({ id: user.id_user, email: user.email }, 'tu_clave_secreta', { expiresIn: '1h' });
        return res.json({
            accessToken: token,
            user: { id: user.id_user, name: user.name, surname: user.surname, email: user.email },
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Internal server error' });
    }
});
exports.loginUser = loginUser;
