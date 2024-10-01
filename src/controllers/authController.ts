import { Request, Response } from 'express';
import User from '../models/user';
import bcrypt from 'bcrypt';

export const registerUser = async (req: Request, res: Response) => {
  const { name, surname, email, password } = req.body;

  try {
    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ msg: 'Email ya registrado' });
    }

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear un nuevo usuario
    await User.create({ name, surname, email, password: hashedPassword });
    console.log("Registro de usuario:", { name, surname, email, password });
    console.log("Hash de la contraseña:", hashedPassword);
    res.status(201).json({ msg: 'Usuario registrado con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error en el servidor' });
  }
};
