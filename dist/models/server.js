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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const connection_1 = __importDefault(require("../db/connection"));
const userRoutes_1 = __importDefault(require("../routes/userRoutes")); // Asegúrate de que esta ruta es correcta
const loginRoutes_1 = __importDefault(require("../routes/loginRoutes"));
const orderRoutes_1 = __importDefault(require("../routes/orderRoutes"));
const paymentRoutes_1 = __importDefault(require("../routes/paymentRoutes"));
const serviceRoutes_1 = __importDefault(require("../routes/serviceRoutes"));
class Server {
    constructor() {
        console.log("PORT:", process.env.PORT);
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '3001';
        this.listen();
        this.midlewares();
        this.routes();
        this.dbConnect();
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log("Aplicación corriendo en el puerto", this.port);
        });
    }
    routes() {
        this.app.get('/', (req, res) => {
            res.json({
                msg: 'API working'
            });
        });
        this.app.use('/api/users', userRoutes_1.default);
        this.app.use('/api/users', loginRoutes_1.default);
        this.app.use('/api/orders', orderRoutes_1.default); // Asegúrate de importar orderRoutes
        // Rutas de pagos
        this.app.use('/api/payments', paymentRoutes_1.default); // Asegúrate de importar paymentRoutes
        // Rutas de servicios (si es necesario)
        this.app.use('/api/services', serviceRoutes_1.default);
    }
    midlewares() {
        // Parseamos el body, convertimos el json en un objeto
        this.app.use(express_1.default.json());
        // Cors:
        const corsOptions = {
            origin: 'http://localhost:4200', // Permite solo este origen
            credentials: true,
            optionsSuccessStatus: 200 // Algunos navegadores antiguos pueden necesitarlo
        };
        this.app.use((0, cors_1.default)(corsOptions));
    }
    dbConnect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield connection_1.default.authenticate();
                console.log("Base de datos conectada");
            }
            catch (error) {
                console.log(error);
                console.log("Error al conectar con la base de datos");
            }
        });
    }
}
exports.default = Server;
