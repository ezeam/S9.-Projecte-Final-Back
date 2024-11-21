import { Request, Response } from 'express';
import AppointmentAvailability from '../models/appointment';

// Obtener las fechas disponibles
export const getDates = async (req: Request, res: Response) => {
  try {
    const dates = await AppointmentAvailability.findAll({
      where: { is_available: true },
      attributes: ['appointmen_date'],
      group: ['appointmen_date'],
    });
    res.json(dates.map(date => date.appointmen_date));
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las fechas disponibles' });
  }
};

// Obtener las horas disponibles para una fecha
export const getTimes = async (req: Request, res: Response) => {
  const { date } = req.params;
  try {
    const times = await AppointmentAvailability.findAll({
      where: { appointmen_date: date, is_available: true },
      attributes: ['appointmen_time'],
    });
    res.json(times.map(time => time.appointmen_time));
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las horas disponibles' });
  }
};

// Reservar una cita
export const book = async (req: Request, res: Response) => {
  const { date, time } = req.body;
  try {
    const appointment = await AppointmentAvailability.findOne({
      where: { appointmen_date: date, appointmen_time: time, is_available: true },
    });

    if (!appointment) {
      return res.status(400).json({ error: 'La hora seleccionada no está disponible' });
    }

    // Marcar la cita como no disponible
    appointment.is_available = false;
    await appointment.save();

    res.status(200).json({ message: 'Cita reservada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al reservar la cita' });
  }
};
