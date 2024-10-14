// models/Service.ts
import { DataTypes, Model } from 'sequelize';
import db from '../db/connection';
import sequelize from '../db/connection';

class Service extends Model {
  public id_service!: number;
  public name_service!: string;
  public description_service!: string;
  public price_service!: number;
  public creation_date_service!: Date;
  public update_date_service!: Date;

  // Define any timestamps if needed
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Service.init(
  {
    id_service: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name_service: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    description_service: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    price_service: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    creation_date_service: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    update_date_service: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'services',
    timestamps: false,
  }
);

export default Service;
