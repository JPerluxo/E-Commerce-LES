const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');

const User = sequelize.define('clientes', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: "cli_id"
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "cli_nome"
    },

    cpf: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "cli_cpf"
    },

    isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        field: "cli_status"
    },

    gender: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "cli_genero"
    },

    birthDate: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "cli_data_nascimento"
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "cli_senha"
    }
}, {
    timestamps: false,
    freezeTableName: true
});

module.exports = User;
