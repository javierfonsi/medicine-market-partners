const { sequelize } = require('../util/database')
const { DataTypes } = require('sequelize')

const Message = sequelize.define('message', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    userId: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
    },
    userDestination: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
    }
})

module.exports = { Message }