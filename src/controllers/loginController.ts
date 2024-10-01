import { Request, Response } from 'express';
import User from '../models/user'; // Ruta correcta al modelo User
import bcrypt from 'bcrypt'; // Asegúrate de tener bcrypt instalado
import jwt from 'jsonwebtoken';

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // Buscar el usuario por email
    const user = await User.findOne({ where: { email } }) as User; // Asegúrate de usar el tipo User
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Verificar la contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ msg: 'Unauthorized: Please check your credentials (user / password) or try again later' });
    }

    // Generar un token
    const token = jwt.sign({ id: user.id_user, email: user.email }, 'tu_clave_secreta', { expiresIn: '1h' });

    return res.json({
      accessToken: token,
      user: { id: user.id_user, name: user.name, surname: user.surname, email: user.email },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Internal server error' });
  }
};
