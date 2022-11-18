"use strict";
const config = require("../config");

const Sequelize = require("sequelize");
const mysqlPool = {
  min: Number(config.MYSQL_POOL_MIN),
  max: Number(config.MYSQL_POOL_MAX),
  idle: Number(config.MYSQL_POOL_IDLE),
  acquire: Number(config.MYSQL_POOL_ACQUIRE),
  evict: Number(config.MYSQL_POOL_EVICT),
  handleDisconnects: true,
};
const define = {
  timestamps: false,
  paranoid: true,
  freezeTableName: true,
};
const mysqlDialectOptions = {
  connectTimeout: Number(config.MYSQL_DIALECT_CONNECT_TIMEOUT),
};
const mysqlDialect = config.MYSQL_DIALECT;
let options = {
  host: config.MYSQL_HOST,
  port: config.MYSQL_PORT,
  dialect: mysqlDialect,
  pool: mysqlPool,
  dialectOptions: mysqlDialectOptions,
  define: define,
  logging: config.NODE_ENV === "production" ? false : console.log,
};

const sequelize = new Sequelize(config.MYSQL_NAME, config.MYSQL_USER, config.MYSQL_PASS, options);

sequelize
  .authenticate()
  .then(() => {
    console.log("[OK] MySQL connected!");
  })
  .catch((err) => {
    console.error("[ERR] MySQL connection error!", err);
  });

let mysql = {
  Sequelize,
  sequelize,
  models: {},
};

//set Model for export
mysql.models.bill_pdf = require("../models/bill_pdf")(sequelize, Sequelize);

module.exports = mysql;
