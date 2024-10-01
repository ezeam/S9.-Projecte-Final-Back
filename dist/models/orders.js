"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// models/Order.ts
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
class Order extends sequelize_1.Model {
}
Order.init({
    id_order: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_user: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    total_amount_order: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
    status_order: {
        type: sequelize_1.DataTypes.ENUM('pending', 'paid', 'cancel', ''),
        allowNull: false,
    },
    date_order: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
    update_order: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
}, {
    sequelize: connection_1.default,
    tableName: 'orders',
    timestamps: false,
});
exports.default = Order;
