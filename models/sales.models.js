const { sequelize } = require('../util/database')
const { DataTypes } = require('sequelize')

const Sales = sequelize.define('sales', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    product:{
        type: DataTypes.STRING(255),
        allowNull: false
    },
    description: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER(10),
        allowNull: false
    },
    userId: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
    },
    status: {
        type: DataTypes.STRING(10),
        allowNull: false,
        defaultValue: 'active'
    }
})

module.exports = { Sales }