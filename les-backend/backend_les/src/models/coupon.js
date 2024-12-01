const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');

const Coupon = sequelize.define('cupons', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: "cpd_id"
    },

    code: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "cpd_codigo"
    },

    value: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "cpd_valor"
    },

    isUsed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        field: "cpd_utilizado"
    },

    type: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "cpd_tipo"
    },

    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "cpd_cli_id"
    }
}, {
    timestamps: false,
    freezeTableName: true
});

module.exports = Coupon;
