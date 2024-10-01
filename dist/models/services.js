"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// models/services.js
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const Services = connection_1.default.define('Services', {
    id_service: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name_service: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    description_service: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    price_service: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
    creation_date_service: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
    update_date_service: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
}, {
    tableName: 'services',
    timestamps: false,
});
exports.default = Services;
