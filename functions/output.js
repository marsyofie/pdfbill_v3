const ip = require("ip");
const moment = require("moment");

exports.print = async function (httpParams, error, output) {
  let request = httpParams.req.body
    ? JSON.stringify(httpParams.req.body).length > 3000
      ? JSON.stringify(httpParams.req.body).substr(0, 3000) + " ...(Selengkapnya di Log Mongo)"
      : JSON.stringify(httpParams.req.body)
    : "";
  let response = output
    ? JSON.stringify(output).length > 3000
      ? JSON.stringify(output).substr(0, 3000) + " ...(Selengkapnya di Log Mongo)"
      : JSON.stringify(output)
    : "";

  console.log("\n==========================================================");
  console.log(error ? "STATUS       : ERROR" : "STATUS       : OK");
  console.log("IP           : " + ip.address());
  console.log("ENDPOINT     : " + httpParams.req.originalUrl);
  console.log("TIMESTAMP    : " + moment().format("YYYY-MM-DD HH:mm:ss").toUpperCase());
  console.log("====================== REQUEST ===========================");
  console.log(request + "\n");
  console.log("====================== RESPONSE ==========================");
  console.log(response + "\n");
  console.log("==========================================================");

  return httpParams.res.status(error ? 500 : 200).json(output);
};
