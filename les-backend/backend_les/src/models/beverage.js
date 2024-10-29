const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');
const Category = require('./category');

const Beverage = sequelize.define('bebidas', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: "bds_id"
    },

    label: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "bds_rotulo"
    },

    costPrice: {
        type: DataTypes.FLOAT,
        allowNull: false,
        field: "bds_preco_de_custo"
    },

    year: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "bds_ano"
    },

    manufacturer: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "bds_fabricante"
    },

    country: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "bds_pais"
    },

    barCode: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "bds_cod_barras"
    },

    alcoholContent: {
        type: DataTypes.FLOAT,
        allowNull: false,
        field: "bds_teor_alcoolico"
    },

    volume: {
        type: DataTypes.FLOAT,
        allowNull: false,
        field: "bds_volume"
    },

    pricingGroupId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "bds_grp_id"
    }
}, {
    timestamps: false,
    freezeTableName: true
});

Beverage.belongsToMany(Category, {
    as: 'categories',
    through: 'bebidas_categorias',
    timestamps: false,
    foreignKey: 'bds_id',
    otherKey: 'cat_id'
});

module.exports = Beverage;
