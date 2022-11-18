// Your active environment.
require("env2")(".env");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const bot = require("./bot");
const config = require("./config");
const dependencies = require("./dependencies");
const app = express();
const routes = dependencies.routes();

let params = { dependencies, config };

app.use(logger(params.config.APP_LOG));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

/* Generating routes. */
// Main logical service processes.
params.config.MYSQL_ENABLE === "true" ? (params.mysql = require("./config/mysql")) : undefined;

routes(express, app, params);

app.listen(params.config.PORT, () => {
  console.log(
    `[OK] ${params.config.SERVICE_NAME} start on port ${params.config.PORT} With environment ${params.config.NODE_ENV}`
  );
  bot.start(params);
});

process.on("unhandledRejection", (err) => {
  console.error(err);
  params.dependencies
    .functions("output")
    .print(params, true, { code: "unhandledRejection", message: JSON.stringify(err) });
  process.exit(1);
});
