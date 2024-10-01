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
exports.register = void 0;
const user_1 = __importDefault(require("../models/user"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, surname, email, password } = req.body; // Cambiar a name y surname
    try {
        // Verificar si el usuario ya existe
        const existingUser = yield user_1.default.findOne({ where: { email } });
        if (existingUser) {
            res.status(400).json({ message: 'Email already registered' });
            return;
        }
        // Encriptar la contraseña
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        // Crear el nuevo usuario
        const newUser = yield user_1.default.create({
            name, // Cambiar a name
            surname, // Cambiar a surname
            email,
            password: hashedPassword,
        });
        // Enviar respuesta al frontend
        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: newUser.id,
                name: newUser.name, // Cambiar a name
                surname: newUser.surname, // Cambiar a surname
                email: newUser.email,
            },
        });
    }
    catch (error) {
        console.error('Error during registration:', error); // Log detallado del error
        res.status(500).json({
            message: 'Server error',
            error: error.message // Type assertion
        });
    }
});
exports.register = register;
