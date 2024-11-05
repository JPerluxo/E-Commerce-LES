const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');

const Purchase = sequelize.define('compras', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: "cpr_id"
    },

    beverageId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "cpr_bds_id"
    },

    beverageQuantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "cpr_qtde_produtos"
    },

    purchaseDate: {
        type: DataTypes.DATE,
        allowNull: true,
        field: "cpr_data"
    },

    purchaseStatus: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "cpr_stc_id"
    },

    purchaseValue: {
        type: DataTypes.FLOAT,
        allowNull: false,
        field: "cpr_valor"
    },

    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "cpr_cli_id"
    },

    purchaseDeliveryAddress: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: "cpr_end_entrega"
    },

    purchaseBillingAddress: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: "cpr_end_cobranca"
    }
}, {
    timestamps: false,
    freezeTableName: true
});

module.exports = Purchase;
