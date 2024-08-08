const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('ecommerce', 'postgres', '123', {
    host: 'localhost',
    dialect: 'postgres',
    port: 5433,
    logging: false
});

module.exports = sequelize;
