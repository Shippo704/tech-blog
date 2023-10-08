// use dotenv information
require('dotenv').config();

// require sequelize module
const Sequelize = require('sequelize');

// new instance of sequelize using jawsDB if available
// otherwise use dotenv information
const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
      host: 'localhost',
      dialect: 'mysql',
      dialectOptions: {
        decimalNumbers: true,
      },
    });

module.exports = sequelize;