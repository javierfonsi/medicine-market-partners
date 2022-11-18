const { sequelize } = require('../util/database')
const { DataTypes } = require('sequelize')

const Chat = sequelize.define('chat', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        al1lowNull: false
    },
    userIdDestination: {
        type: DataTypes.STRING(15),
        allowNull: false,
    },
    userIdOrigin: {
        type: DataTypes.STRING(15),
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING(10),
        allowNull: false,
        defaultValue: 'active'
    }
})

module.exports = { Chat }