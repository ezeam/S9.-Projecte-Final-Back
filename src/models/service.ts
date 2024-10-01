// models/Service.ts
import { DataTypes, Model } from 'sequelize';
import db from '../db/connection';

interface ServiceAttributes {
  id_service?: number;
  name_service: string;
  description_service: string;
  price_service: number;
  creation_date_service?: Date;
  update_date_service?: Date;
}

class Service extends Model<ServiceAttributes> implements ServiceAttributes {
  public id_service!: number;
  public name_service!: string;
  public description_service!: string;
  public price_service!: number;
  public creation_date_service!: Date;
  public update_date_service!: Date;
}

Service.init(
  {
    id_service: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name_service: {
      type: DataTypes.STRING,
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
    sequelize: db,
    tableName: 'services',
    timestamps: false,
  }
);

export default Service;
