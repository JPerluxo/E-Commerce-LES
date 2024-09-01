const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');

const Address = sequelize.define('enderecos', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: "end_id"
    },

    isDelivery: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        field: "end_entrega"
    },

    isBilling: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        field: "end_cobranca"
    },

    streetType: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "end_tipo_logradouro"
    },

    street: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "end_logradouro"
    },

    number: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "end_numero"
    },

    neighborhood: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "end_bairro"
    },

    cep: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "end_cep"
    },

    city: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "end_cidade"
    },

    state: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "end_estado"
    },

    country: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "end_pais"
    },

    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "end_cli_id"
    }
}, {
    timestamps: false,
    freezeTableName: true
});

module.exports = Address;
