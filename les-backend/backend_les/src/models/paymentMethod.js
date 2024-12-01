const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');

const PaymentMethod = sequelize.define('meios_pagamento', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: "mpg_id"
    },

    purchaseId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "mpg_cpr_id"
    },

    creditCardId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: "mpg_crt_id"
    },

    couponId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: "mpg_cpd_id"
    }
}, {
    timestamps: false,
    freezeTableName: true
});

module.exports = PaymentMethod;
