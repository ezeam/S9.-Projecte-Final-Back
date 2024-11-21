import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/connection';

class AppointmentAvailability extends Model {
  public id!: number;
  public appointmen_date!: string;
  public appointmen_time!: string;
  public is_available!: boolean;
}

AppointmentAvailability.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    appointmen_date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    appointmen_time: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_available: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    tableName: 'appointment_availability', // Nombre de la tabla en la base de datos
    timestamps: false, // No utilizamos timestamps (createdAt, updatedAt)
  }
);

export default AppointmentAvailability;
