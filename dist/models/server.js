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
const userRoutes_1 = __importDefault(require("../routes/userRoutes"));
const loginRoutes_1 = __importDefault(require("../routes/loginRoutes"));
const orderRoutes_1 = __importDefault(require("../routes/orderRoutes"));
const serviceRoutes_1 = __importDefault(require("../routes/serviceRoutes"));
const webhookRoutes_1 = __importDefault(require("../routes/webhookRoutes"));
const appointmentRoutes_1 = __importDefault(require("../routes/appointmentRoutes"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '3001';
        this.listen();
        this.middlewares(); // Cambié a "middlewares"
        this.routes();
        this.dbConnect();
    }
    middlewares() {
        this.app.use(express_1.default.json());
        /*Desarrollo*/
        /*
        const corsOptions = {
          origin: 'http://localhost:4200',
          credentials: true,
          optionsSuccessStatus: 200
        };
        this.app.use(cors(corsOptions));
        */
        /*Producción*/
        const corsOptions = {
            origin: 'https://educareinpositivo.site/',
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
            allowedHeaders: ['Content-Type', 'Authorization'],
            credentials: true,
        };
        this.app.use((0, cors_1.default)(corsOptions));
    }
    routes() {
        // Rutas básicas
        this.app.get('/', (req, res) => {
            res.send('¡Servidor funcionando correctamente!');
        });
        this.app.get('/api', (req, res) => {
            res.json({
                msg: 'API working'
            });
        });
        this.app.use('/api/users', userRoutes_1.default);
        this.app.use('/api/users', loginRoutes_1.default); // Cambia esto a /api/login en un futuro y con CUIDADO : )
        this.app.use('/api/orders', orderRoutes_1.default);
        this.app.use('/api/services', serviceRoutes_1.default);
        this.app.use('/api/webhook', webhookRoutes_1.default);
        this.app.use('/api/appointments', appointmentRoutes_1.default);
    }
    dbConnect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield connection_1.default.authenticate();
                console.log("Base de datos conectada");
            }
            catch (error) {
                console.error("Error al conectar con la base de datos", error); // Mostrar el error en consola
            }
        });
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log("Aplicación corriendo en el puerto", this.port);
        });
    }
}
exports.default = Server;
