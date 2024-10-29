const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');

const PricingGroup = sequelize.define('grupos_precificacao', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: "grp_id"
    },

    description: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "grp_descricao"
    },

    profitMargin: {
        type: DataTypes.FLOAT,
        allowNull: false,
        field: "grp_margem_lucro"
    }
}, {
    timestamps: false,
    freezeTableName: true
});

module.exports = PricingGroup;