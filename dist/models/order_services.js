"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// models/order_services.js
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const OrderServices = connection_1.default.define('OrderServices', {
    id_order_service: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_order: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    id_service: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'order_services',
    timestamps: false,
});
exports.default = OrderServices;
