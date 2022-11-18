"use strict";

module.exports = {
  NODE_ENV: process.env.NODE_ENV || "development",
  APP_LOG: process.env.APP_LOG || "true",
  CHAT_ID: process.env.CHAT_ID || "1234567",

  //mysql
  MYSQL_ENABLE: process.env.MYSQL_ENABLE || "true",
  MYSQL_DIALECT: process.env.MYSQL_DIALECT || "mysql",
  MYSQL_DIALECT_CONNECT_TIMEOUT: process.env.MYSQL_DIALECT_CONNECT_TIMEOUT || "2000000000",
  MYSQL_POOL_ACQUIRE: process.env.MYSQL_POOL_ACQUIRE || "2000000000",
  MYSQL_POOL_IDLE: process.env.MYSQL_POOL_IDLE || "1",
  MYSQL_POOL_MAX: process.env.MYSQL_POOL_MAX || "7",
  MYSQL_POOL_MIN: process.env.MYSQL_POOL_MIN || "0",
  MYSQL_HOST: process.env.MYSQL_HOST || "localhost",
  MYSQL_NAME: process.env.MYSQL_NAME || "db_local",
  MYSQL_PASS: process.env.MYSQL_PASS || "password",
  MYSQL_PORT: process.env.MYSQL_PORT || "3306",
  MYSQL_USER: process.env.MYSQL_USER || "root",

  PDF_PATH: process.env.PDF_PATH || "pdf/",
  PORT: process.env.PORT || "8000",
  SERVICE_NAME: process.env.SERVICE_NAME || "pdfbill_v2",
  TOKEN_BOT: process.env.TOKEN_BOT || "xxxx",
  TOKEN_CSV_BOT: process.env.TOKEN_CSV_BOT || "yyyy",
  URL_CSV_BOT: process.env.URL_CSV_BOT || "t.me/zzz",
  WHITELIST_SENDER: process.env.WHITELIST_SENDER || "admin",

  //mail
  MAIL_HOST: process.env.MAIL_HOST || "smtp.mailtrap.io",
  MAIL_PORT: process.env.MAIL_PORT || "25",
  MAIL_USER: process.env.MAIL_USER || "dev@outlook.com",
  MAIL_PASS: process.env.MAIL_PASS || "password",
  MAIL_TO: process.env.MAIL_TO || "dev@outllok.com",
};
