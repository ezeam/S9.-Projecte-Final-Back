"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
class AppointmentAvailability extends sequelize_1.Model {
}
AppointmentAvailability.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    appointmen_date: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    appointmen_time: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    is_available: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true,
    },
}, {
    sequelize: connection_1.default,
    tableName: 'appointment_availability', // Nombre de la tabla en la base de datos
    timestamps: false, // No utilizamos timestamps (createdAt, updatedAt)
});
exports.default = AppointmentAvailability;
