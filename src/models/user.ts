import { DataTypes, Model } from 'sequelize';
import db from '../db/connection';
import sequelize from '../db/connection';

class User extends Model {
  public id_user!: number;
  public name!: string;
  public surname!: string;
  public email!: string;
  public password!: string;
  public dni!: string; // Asegúrate de incluir esta propiedad
  public address!: string;

  // Define any timestamps if needed
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id_user: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    surname: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    dni: {
      type: DataTypes.STRING(15), 
      allowNull: false,
      unique: false, 
    },
    address: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'users',
    timestamps: false,
  }
);

export default User;
