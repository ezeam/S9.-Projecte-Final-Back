"use strict";
/*import Server from "./models/server";
import dotenv from 'dotenv';

// Configuramos las variables de entorno:
dotenv.config();

const server = new Server();*/
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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const connection_1 = __importDefault(require("./db/connection"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const loginRoutes_1 = __importDefault(require("./routes/loginRoutes"));
const orderRoutes_1 = __importDefault(require("./routes/orderRoutes"));
const serviceRoutes_1 = __importDefault(require("./routes/serviceRoutes"));
const webhookRoutes_1 = __importDefault(require("./routes/webhookRoutes"));
const appointmentRoutes_1 = __importDefault(require("./routes/appointmentRoutes"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || "3001";
const corsOptions = {
    origin: 'https://educareinpositivo.site/',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
};
app.use(express_1.default.json());
app.use((0, cors_1.default)(corsOptions));
app.get("/", (_req, res) => {
    res.json({
        msg: "API working",
    });
});
app.use("/api/users", userRoutes_1.default); //Las dos rutas parecen iguales pero cada una tiene un endpoint diferente, por lo qu eno tiene que causar error
app.use("/api/users", loginRoutes_1.default);
app.use("/api/orders", orderRoutes_1.default);
app.use("/api/services", serviceRoutes_1.default);
app.use("/api/webhook", webhookRoutes_1.default);
app.use("/api/appointments", appointmentRoutes_1.default);
app.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Server running on port ${PORT}`);
    try {
        yield connection_1.default.authenticate();
        console.log("Base de datos conectada");
    }
    catch (error) {
        console.error("Error al conectar con la base de datos", error);
    }
}));
