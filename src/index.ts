/*import Server from "./models/server";
import dotenv from 'dotenv';

// Configuramos las variables de entorno:
dotenv.config();

const server = new Server();*/


import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import db from "./db/connection";
import userRoutes from "./routes/userRoutes";
import loginRoutes from "./routes/loginRoutes";
import orderRoutes from "./routes/orderRoutes";
import serviceRoutes from "./routes/serviceRoutes";
import webhookRoutes from "./routes/webhookRoutes";
import appointmentRoutes from "./routes/appointmentRoutes";

const app = express();
const PORT = process.env.PORT || "3001";
const corsOptions = {
  origin: 'https://educareinpositivo.site/', 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));
app.get("/", (_req: Request, res: Response) => {
  res.json({
    msg: "API working",
  });
});
app.use("/api/users", userRoutes); //Las dos rutas parecen iguales pero cada una tiene un endpoint diferente, por lo qu eno tiene que causar error
app.use("/api/users", loginRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/webhook", webhookRoutes);
app.use("/api/appointments", appointmentRoutes);

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  try {
    await db.authenticate();
    console.log("Base de datos conectada");
  } catch (error) {
    console.error("Error al conectar con la base de datos", error);
  }
});