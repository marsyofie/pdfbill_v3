"use strict";
const path = require("path");

module.exports = {
  routes: () => {
    return require(`./routes/routes`);
  },

  controllers: (path) => {
    return require(`./controllers/${path}`);
  },

  functions: (path) => {
    return require(`./functions/${path}`);
  },
};
