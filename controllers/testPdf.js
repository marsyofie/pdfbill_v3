"use strict";
const fs = require("fs");
const PDFDocument = require("pdfkit");
const moment = require("moment");

module.exports = async function (httpParams, params) {
  let output = params.dependencies.functions("output");

  //force create dir
  if (!fs.existsSync(params.config.PDF_PATH)) {
    fs.mkdirSync(params.config.PDF_PATH, { recursive: true });
  }

  let data = {
    billing_id: "xxxxxxxxx",
    cust_name: "John Doe",
    amount_currency: "318.422",
    admin: "3.500",
    total_amount: "321.922",
  };

  await createPdf(params, data);

  output.print(httpParams, false, { code: "200", message: "Berhasil" });
};

const createPdf = async (params, data) => {
  return new Promise(async (resolve, reject) => {
    let filename = `${params.config.PDF_PATH}${moment().format("YYYY-MM")}_TELOKM.pdf`;
    // Create a document
    let doc = new PDFDocument({ margins: { top: 10, left: 100, right: 100, bottom: 10 } });

    const writeStream = fs.createWriteStream(filename);

    doc.pipe(writeStream);

    await params.dependencies.functions("pdf").telkom(data, doc);

    writeStream.on("error", (err) => {
      reject(err);
    });

    writeStream.on("finish", () => {
      resolve(filename);
    });

    // Finalize PDF file
    doc.end();
  });
};
