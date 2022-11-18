"use strict";
const number = require("../functions/number");

module.exports = function (sequelize, Sequelize) {
  let bill_pdf = sequelize.define(
    "channel",
    {
      id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
      },
      channel_id: {
        type: Sequelize.INTEGER(11),
      },
      channel_name: {
        type: Sequelize.STRING(30),
      },
    },
    {}
  );

  // Model.associate = function(models) {};

  return bill_pdf;
};
