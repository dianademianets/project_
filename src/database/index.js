const Sequelize = require('sequelize');

const {
    config: {
        DB, DB_PASSWORD, DB_USER
    }
} = require('../configs');

module.exports.sequelize = new Sequelize(DB, DB_USER, DB_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});
