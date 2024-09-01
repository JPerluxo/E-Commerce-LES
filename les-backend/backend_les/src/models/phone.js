const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');

const Phone = sequelize.define('telefones', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: "tel_id"
    },

    number: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "tel_numero"
    },

    type: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "tel_tipo"
    },

    ddd: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "tel_ddd"
    },

    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "tel_cli_id"
    }
}, {
    timestamps: false,
    freezeTableName: true
});

module.exports = Phone;
