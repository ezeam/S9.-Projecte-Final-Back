// models/Payment.ts
import { DataTypes, Model } from 'sequelize';
import db from '../db/connection';

interface PaymentAttributes {
  id_payment?: number;
  id_order: number;
  id_user: number;
  amount: number;
  payment_method: 'paypal' | 'credit_card' | 'bizum' | 'transfer';
  payment_status: 'pending' | 'complete' | 'failed' | '';
  id_transaction_paypal: string;
  date_payment?: Date;
}

class Payment extends Model<PaymentAttributes> implements PaymentAttributes {
  public id_payment!: number;
  public id_order!: number;
  public id_user!: number;
  public amount!: number;
  public payment_method!: 'paypal' | 'credit_card' | 'bizum' | 'transfer';
  public payment_status!: 'pending' | 'complete' | 'failed' | '';
  public id_transaction_paypal!: string;
  public date_payment!: Date;
}

Payment.init(
  {
    id_payment: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_order: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    payment_method: {
      type: DataTypes.ENUM('paypal', 'credit_card', 'bizum', 'transfer'),
      allowNull: false,
    },
    payment_status: {
      type: DataTypes.ENUM('pending', 'complete', 'failed', ''),
      allowNull: false,
    },
    id_transaction_paypal: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date_payment: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize: db,
    tableName: 'payments',
    timestamps: false,
  }
);

export default Payment;
