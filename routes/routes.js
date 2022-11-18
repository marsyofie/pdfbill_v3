"use strict";
module.exports = (express, app, params) => {
  const handler = (req, res, service) => {
    let httpParams = { req, res };
    return params.dependencies.controllers(service)(httpParams, params);
  };

  app.get("/test", (req, res) => {
    return handler(req, res, "testPdf");
  });
};
