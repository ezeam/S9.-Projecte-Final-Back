import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import db from '../db/connection';
import userRoutes from '../routes/userRoutes'; // Asegúrate de que esta ruta es correcta
import loginRoutes from '../routes/loginRoutes';
import orderRoutes from '../routes/orderRoutes';
import paymentRoutes from '../routes/paymentRoutes';
import serviceRoutes from '../routes/serviceRoutes';

class Server {
  private app: Application;
  private port: string;

  constructor() {
    console.log("PORT:", process.env.PORT);
    this.app = express();
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
    this.app.get('/', (req: Request, res: Response) => {
      res.json({
        msg: 'API working'
      });
    });
    this.app.use('/api/users', userRoutes);
    this.app.use('/api/users', loginRoutes);
    this.app.use('/api/orders', orderRoutes); // Asegúrate de importar orderRoutes

  // Rutas de pagos
  this.app.use('/api/payments', paymentRoutes); // Asegúrate de importar paymentRoutes
  
  // Rutas de servicios (si es necesario)
  this.app.use('/api/services', serviceRoutes);
  }

  midlewares() {
    // Parseamos el body, convertimos el json en un objeto
    this.app.use(express.json());

    // Cors:
    const corsOptions = {
      origin: 'http://localhost:4200', // Permite solo este origen
      credentials: true,
      optionsSuccessStatus: 200 // Algunos navegadores antiguos pueden necesitarlo
    };
    this.app.use(cors(corsOptions));
  }

  async dbConnect() {
    try {
      await db.authenticate();
      console.log("Base de datos conectada");
    } catch (error) {
      console.log(error);
      console.log("Error al conectar con la base de datos");
    }
  }
}

export default Server;
