import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import db from '../db/connection';
import userRoutes from '../routes/userRoutes';
import loginRoutes from '../routes/loginRoutes';
import orderRoutes from '../routes/orderRoutes';
import serviceRoutes from '../routes/serviceRoutes';
import webhookRoutes from '../routes/webhookRoutes';
import appointmentRoutes from '../routes/appointmentRoutes';

class Server {
  private app: Application;
  private port: string;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || '3001';
    this.listen();
    this.middlewares(); // Cambié a "middlewares"
    this.routes();
    this.dbConnect();
  }

  middlewares() {
    this.app.use(express.json());

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
    this.app.use(cors(corsOptions));
  }

  routes() {
    // Rutas básicas
    this.app.get('/',(req: Request, res: Response) => {
      res.send('¡Servidor funcionando correctamente!');
    });

    this.app.get('/api', (req: Request, res: Response) => {
      res.json({
        msg: 'API working'
      });
    });
    this.app.use('/api/users', userRoutes);
    this.app.use('/api/users', loginRoutes); // Cambia esto a /api/login en un futuro y con CUIDADO : )
    this.app.use('/api/orders', orderRoutes);
    this.app.use('/api/services', serviceRoutes);
    this.app.use('/api/webhook', webhookRoutes);
    this.app.use('/api/appointments', appointmentRoutes);
  }
  
  async dbConnect() {
    try {
      await db.authenticate();
      console.log("Base de datos conectada");
    } catch (error) {
      console.error("Error al conectar con la base de datos", error); // Mostrar el error en consola
    }
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Aplicación corriendo en el puerto", this.port);
    });
  }
}


export default Server;
