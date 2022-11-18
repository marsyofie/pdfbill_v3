"use strict";
const number = require("../functions/number");

module.exports = function (sequelize, Sequelize) {
  let bill_pdf = sequelize.define(
    "bill_pdf",
    {
      id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
      },
      type: {
        type: Sequelize.STRING(10),
      },
      billing_id: {
        type: Sequelize.STRING(30),
      },
      cust_name: {
        type: Sequelize.STRING(50),
      },
      amount: {
        type: Sequelize.BIGINT(20),
      },
      daya: {
        type: Sequelize.STRING(20),
      },
      peserta: {
        type: Sequelize.STRING(5),
      },
      alamat: {
        type: Sequelize.STRING(255),
      },
      admin: {
        type: Sequelize.INTEGER(5),
      },
      channel_id: {
        type: Sequelize.INTEGER(2),
      },
      active: {
        type: Sequelize.INTEGER(1),
      },
      created_at: {
        type: Sequelize.DATE,
      },
      amount_format: {
        type: Sequelize.VIRTUAL,
        get() {
          return number.currency(this.getDataValue("amount"));
        },
      },
      admin_format: {
        type: Sequelize.VIRTUAL,
        get() {
          return number.currency(this.getDataValue("admin"));
        },
      },
      tagihan_format: {
        type: Sequelize.VIRTUAL,
        get() {
          let total = this.getDataValue("admin") + this.getDataValue("amount");
          return number.currency(total);
        },
      },
    },
    {}
  );

  // Model.associate = function(models) {};

  return bill_pdf;
};
