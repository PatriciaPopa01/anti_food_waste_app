const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ownerId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false
    },
    quantity: {
        type: DataTypes.STRING,
        allowNull: false
    },
    expiryDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    notes: {
        type: DataTypes.TEXT
    },
    status: {
        type: DataTypes.ENUM('available', 'claimed', 'consumed', 'trashed'),
        defaultValue: 'available'
    }
});

module.exports = Product;