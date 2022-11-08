const { sequelize } = require('../util/database')
const { DataTypes } = require('sequelize')

const Message = sequelize.define('message', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    text: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    userId: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
    },
    chatId: {
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

module.exports = { Message }