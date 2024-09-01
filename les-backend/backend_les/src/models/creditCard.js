const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');

const CreditCard = sequelize.define('cartoes_de_credito', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: "crt_id"
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "crt_nome_impresso"
    },

    number: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "crt_numero"
    },    

    cvv: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "crt_codigo_seguranca"
    },

    dueDate: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "crt_data_vencimento"
    },

    isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        field: "crt_esta_ativo"
    },

    flag: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "crt_bnd_id"
    },

    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "crt_cli_id"
    }
}, {
    timestamps: false,
    freezeTableName: true
});

module.exports = CreditCard;
