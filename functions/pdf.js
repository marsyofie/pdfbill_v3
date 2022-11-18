"use strict";
const moment = require("moment");

exports.pln = async (data, doc) => {
  // Embed a font, set the font size, and render some text
  doc.font("Helvetica-Bold").text("STRUK PEMBAYARAN TAGIHAN LISTRIK", { align: "center" });
  doc.moveDown();

  doc.font("Times-Roman").fontSize(9.75);
  doc.text("ID PELANGGAN", { continued: true });
  doc.x += 25;
  doc.text(":", { continued: true });
  doc.x += 5;
  doc.text(data.billing_id);

  doc.text("NAMA", { continued: true });
  doc.x += 68;
  doc.text(":", { continued: true });
  doc.x += 5;
  doc.text(data.cust_name);

  doc.text("TARIF/DAYA", { continued: true });
  doc.x += 42;
  doc.text(":", { continued: true });
  doc.x += 5;
  doc.text(data.daya);

  doc.text("BL/TH", { continued: true });
  doc.x += 69;
  doc.text(":", { continued: true });
  doc.x += 5;
  doc.text(moment().format("MMMYY").toUpperCase());

  doc.text("RP TAG PLN", { continued: true });
  doc.x += 43;
  doc.text(":", { continued: true });
  doc.x += 5;
  doc.text("Rp. " + data.amount_currency );

  doc.text("NO REFF", { continued: true });
  doc.x += 57;
  doc.text(":", { continued: true });
  doc.x += 5;
  doc.text("PLN" + moment().format("YYYYMMDDHHmmssSSSS"));

  doc.moveDown();
  doc.text("PLN menyatakan struk ini sebagai bukti pembayaran yang sah.", {
    align: "center",
    underline: true,
  });
  doc.moveDown();

  doc.text("ADMIN", { continued: true });
  doc.x += 64;
  doc.text(":", { continued: true });
  doc.x += 5;
  doc.text("Rp. " + data.admin);

  doc.text("TOTAL BAYAR", { continued: true });
  doc.x += 32;
  doc.text(":", { continued: true });
  doc.x += 5;
  doc.text("Rp. " + data.total_amount);

  return doc;
};

exports.pdam = async (data, doc) => {
  doc.font("Helvetica-Bold").text("STRUK PEMBAYARAN PDAM", { align: "center" });
  doc.moveDown();

  doc.font("Times-Roman").fontSize(9.75);
  doc.text("ID PELANGGAN", { continued: true });
  doc.x += 25;
  doc.text(":", { continued: true });
  doc.x += 5;
  doc.text(data.billing_id);

  doc.text("NAMA", { continued: true });
  doc.x += 68;
  doc.text(":", { continued: true });
  doc.x += 5;
  doc.text(data.cust_name);

  doc.text("ALAMAT", { continued: true });
  doc.x += 57;
  doc.text(":", { continued: true });
  doc.x += 5;
  doc.text(data.alamat);

  doc.text("BL/TH", { continued: true });
  doc.x += 69;
  doc.text(":", { continued: true });
  doc.x += 5;
  doc.text(moment().subtract(1, "months").format("MMMYY").toUpperCase());

  doc.text("RP TAG PDAM", { continued: true });
  doc.x += 34;
  doc.text(":", { continued: true });
  doc.x += 5;
  doc.text("Rp. " + data.amount_currency);

  doc.text("NO REFF", { continued: true });
  doc.x += 57;
  doc.text(":", { continued: true });
  doc.x += 5;
  doc.text("PDAM" + moment().format("YYYYMMDDHHmmssSSSS"));

  doc.moveDown();
  doc.text("PDAM menyatakan struk ini sebagai bukti pembayaran yang sah.", {
    align: "center",
    underline: true,
  });
  doc.moveDown();

  doc.text("ADMIN", { continued: true });
  doc.x += 64;
  doc.text(":", { continued: true });
  doc.x += 5;
  doc.text("Rp. " + data.admin);

  doc.text("TOTAL BAYAR", { continued: true });
  doc.x += 32;
  doc.text(":", { continued: true });
  doc.x += 5;
  doc.text("Rp. " + data.total_amount);
  return doc;
};

exports.bpjs = async (data, doc) => {
  doc.font("Helvetica-Bold").text("STRUK PEMBAYARAN BPJS KESEHATAN", { align: "center" });
  doc.moveDown();

  doc.font("Times-Roman").fontSize(9.75);
  doc.text("ID PELANGGAN", { continued: true });
  doc.x += 25;
  doc.text(":", { continued: true });
  doc.x += 5;
  doc.text(data.billing_id);

  doc.text("NAMA", { continued: true });
  doc.x += 68;
  doc.text(":", { continued: true });
  doc.x += 5;
  doc.text(data.cust_name);

  doc.text("JUMLAH PESERTA", { continued: true });
  doc.x += 15;
  doc.text(":", { continued: true });
  doc.x += 5;
  doc.text(data.peserta + " Orang");

  doc.text("BL/TH", { continued: true });
  doc.x += 69;
  doc.text(":", { continued: true });
  doc.x += 5;
  doc.text(moment().format("MMMYY").toUpperCase());

  doc.text("RP TAG BPJS", { continued: true });
  doc.x += 40;
  doc.text(":", { continued: true });
  doc.x += 5;
  doc.text("Rp. " + data.amount_currency);

  doc.text("NO REFF", { continued: true });
  doc.x += 57;
  doc.text(":", { continued: true });
  doc.x += 5;
  doc.text("BPJS" + moment().format("YYYYMMDDHHmmssSSSS"));

  doc.moveDown();
  doc.text("BPJS Kesehatan menyatakan struk ini sebagai bukti pembayaran yang sah.", {
    align: "center",
    underline: true,
  });
  doc.moveDown();

  doc.text("ADMIN", { continued: true });
  doc.x += 64;
  doc.text(":", { continued: true });
  doc.x += 5;
  doc.text("Rp. " + data.admin);

  doc.text("TOTAL BAYAR", { continued: true });
  doc.x += 32;
  doc.text(":", { continued: true });
  doc.x += 5;
  doc.text("Rp. " + data.total_amount);
  return doc;
};

exports.telkom = async (data, doc) => {
  doc.font("Helvetica-Bold").text("STRUK PEMBAYARAN TAGIHAN TELKOM", { align: "center" });
  doc.moveDown();

  doc.font("Times-Roman").fontSize(9.75);
  doc.text("ID PELANGGAN", { continued: true });
  doc.x += 25;
  doc.text(":", { continued: true });
  doc.x += 5;
  doc.text(data.billing_id);

  doc.text("NAMA", { continued: true });
  doc.x += 68;
  doc.text(":", { continued: true });
  doc.x += 5;
  doc.text(data.cust_name);

  doc.text("BL/TH", { continued: true });
  doc.x += 69;
  doc.text(":", { continued: true });
  doc.x += 5;
  doc.text(moment().format("MMMYY").toUpperCase());

  doc.text("RP TAG", { continued: true });
  doc.x += 64;
  doc.text(":", { continued: true });
  doc.x += 5;
  doc.text("Rp. " + data.amount_currency);

  doc.text("NO REFF", { continued: true });
  doc.x += 57;
  doc.text(":", { continued: true });
  doc.x += 5;
  doc.text("TLK" + moment().format("YYYYMMDDHHmmssSSSS"));

  doc.moveDown();
  doc.text("TELKOM menyatakan struk ini sebagai bukti pembayaran yang sah.", {
    align: "center",
    underline: true,
  });
  doc.moveDown();

  doc.text("ADMIN", { continued: true });
  doc.x += 64;
  doc.text(":", { continued: true });
  doc.x += 5;
  doc.text("Rp. " + data.admin);

  doc.text("TOTAL BAYAR", { continued: true });
  doc.x += 32;
  doc.text(":", { continued: true });
  doc.x += 5;
  doc.text("Rp. " + data.total_amount);
  return doc;
};
