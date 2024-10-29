const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');

const Category = sequelize.define('categorias', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: "cat_id"
    },

    description: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "cat_descricao"
    }
}, {
    timestamps: false,
    freezeTableName: true
});

module.exports = Category;
