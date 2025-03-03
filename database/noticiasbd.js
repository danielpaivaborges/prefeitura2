'use strict'
const Sequelize = require("sequelize");

const connectionNoticias = new Sequelize(
  "serradasaudade",
  "serradasaudade",
  "root2025",
  {
    host: "mysql.serradasaudade.com",
    dialect: "mysql",
    timezone: "-03:00"
  }
);

module.exports = connectionNoticias;

