"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// models/Payment.ts
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
class Payment extends sequelize_1.Model {
}
Payment.init({
    id_payment: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_order: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    id_user: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    amount: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
    payment_method: {
        type: sequelize_1.DataTypes.ENUM('paypal', 'credit_card', 'bizum', 'transfer'),
        allowNull: false,
    },
    payment_status: {
        type: sequelize_1.DataTypes.ENUM('pending', 'complete', 'failed', ''),
        allowNull: false,
    },
    id_transaction_paypal: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    date_payment: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
}, {
    sequelize: connection_1.default,
    tableName: 'payments',
    timestamps: false,
});
exports.default = Payment;
