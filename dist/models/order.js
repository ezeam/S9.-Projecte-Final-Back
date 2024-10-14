"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const user_1 = __importDefault(require("./user"));
const service_1 = __importDefault(require("./service"));
class Order extends sequelize_1.Model {
}
Order.init({
    id_order: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    user_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: user_1.default,
            key: 'id_user',
        },
    },
    service_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: service_1.default,
            key: 'id_service',
        },
    },
    total_amount_order: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
    payment_method: {
        type: sequelize_1.DataTypes.ENUM('paypal', 'credit card', 'bizum', 'transfer'),
        allowNull: false,
    },
    payment_status: {
        type: sequelize_1.DataTypes.STRING(50),
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
    external_order_id: {
        type: sequelize_1.DataTypes.STRING(130),
        allowNull: true,
    },
    external_transaction_id: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: true,
    },
}, {
    sequelize: connection_1.default, // Asegúrate de que la conexión sea correcta
    tableName: 'orders',
    timestamps: false, // Cambia esto a true si decides usar createdAt y updatedAt
});
// Associations
Order.belongsTo(user_1.default, { foreignKey: 'user_id' });
Order.belongsTo(service_1.default, { foreignKey: 'service_id' });
exports.default = Order;
