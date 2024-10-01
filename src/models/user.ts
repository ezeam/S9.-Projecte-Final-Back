import { DataTypes, Model } from 'sequelize';
import db from '../db/connection';

interface UserAttributes {
  id_user?: number;
  name: string;
  surname: string;
  email: string;
  password: string;
}

class User extends Model<UserAttributes> implements UserAttributes {
  public id_user!: number;
  public name!: string;
  public surname!: string;
  public email!: string;
  public password!: string;
}

User.init(
  {
    id_user: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: 'users',
    timestamps: false,
  }
);

export default User;
