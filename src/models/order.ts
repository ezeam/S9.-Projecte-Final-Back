// models/Order.ts
import { DataTypes, Model } from 'sequelize';
import db from '../db/connection';

interface OrderAttributes {
  id_order?: number;
  id_user: number;
  total_amount_order: number;
  status_order: 'pending' | 'paid' | 'cancel' | '';
  date_order?: Date;
  update_order?: Date;
}

class Order extends Model<OrderAttributes> implements OrderAttributes {
  public id_order!: number;
  public id_user!: number;
  public total_amount_order!: number;
  public status_order!: 'pending' | 'paid' | 'cancel' | '';
  public date_order!: Date;
  public update_order!: Date;
}

Order.init(
  {
    id_order: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total_amount_order: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    status_order: {
      type: DataTypes.ENUM('pending', 'paid', 'cancel', ''),
      allowNull: false,
    },
    date_order: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    update_order: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize: db,
    tableName: 'orders',
    timestamps: false,
  }
);

export default Order;
