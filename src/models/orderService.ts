// models/OrderService.ts
import { DataTypes, Model } from 'sequelize';
import db from '../db/connection';

interface OrderServiceAttributes {
  id_order_service?: number;
  id_order: number;
  id_service: number;
}

class OrderService extends Model<OrderServiceAttributes> implements OrderServiceAttributes {
  public id_order_service!: number;
  public id_order!: number;
  public id_service!: number;
}

OrderService.init(
  {
    id_order_service: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_order: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_service: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: 'order_services',
    timestamps: false,
  }
);

export default OrderService;
