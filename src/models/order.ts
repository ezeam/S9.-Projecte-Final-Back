import { DataTypes, Model } from 'sequelize';
import db from '../db/connection';
import User from './user';
import Service from './service';

class Order extends Model {
  public id_order!: number;
  public user_id!: number;
  public service_id!: number;
  public total_amount_order!: number;
  public payment_method!: 'paypal' | 'credit card' | 'bizum' | 'transfer';
  public payment_status!: string;
  public date_order!: Date;
  public update_order!: Date;
  public external_order_id!: string;
  public external_transaction_id!: string | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Order.init(
  {
    id_order: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id_user',
      },
    },
    service_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Service,
        key: 'id_service',
      },
    },
    total_amount_order: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    payment_method: {
      type: DataTypes.ENUM('paypal', 'credit card', 'bizum', 'transfer'),
      allowNull: false,
    },
    payment_status: {
      type: DataTypes.STRING(50),
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
    external_order_id: {
      type: DataTypes.STRING(130),
      allowNull: true,
    },
    external_transaction_id: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
  },
  {
    sequelize: db, // Asegúrate de que la conexión sea correcta
    tableName: 'orders',
    timestamps: false, // Cambia esto a true si decides usar createdAt y updatedAt
  }
);

// Associations
Order.belongsTo(User, { foreignKey: 'user_id' });
Order.belongsTo(Service, { foreignKey: 'service_id' });

export default Order;
