"use strict";
const TelegramBot = require("node-telegram-bot-api");
const { parse } = require("csv-parse");
const moment = require("moment");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const axios = require("axios");
const FormData = require("form-data");

exports.start = async (params) => {
  // Create a bot that uses 'polling' to fetch new updates
  const bot = new TelegramBot(params.config.TOKEN_CSV_BOT, { polling: true });
  console.log(`[OK] BOT Started ${params.config.URL_CSV_BOT}`);

  bot.on("message", (msg) => {
    console.log(msg);
    const chatId = msg.chat.id;
    const fromId = msg.from.id;
    const senderUname = msg.from.username;
    let csvRow = [];

    if (
      filterSender(params, senderUname) &&
      msg.caption === "start" &&
      msg.document &&
      msg.document.mime_type === "text/csv"
    ) {
      bot
        .getFileStream(msg.document.file_id)
        .pipe(parse({ delimiter: ",", columns: (header) => header.map((column) => column.toLowerCase()) }))
        .on("data", (row) => {
          // console.log(row);
          csvRow.push(row);
        })
        .on("end", async () => {
          console.log("finished");

          try {
            //checking data must greather than 1
            if (csvRow.length > 1) {
              //force create dir
              if (!fs.existsSync(params.config.PDF_PATH)) {
                fs.mkdirSync(params.config.PDF_PATH, { recursive: true });
              }

              //create pdf
              const filenamePdf = await createPdf(params, csvRow);

              //send telegram
              await sendTelegram(params, filenamePdf);
              params.dependencies.functions("mail").sendPdf(filenamePdf);

              bot.sendMessage(chatId, `Sukses bos : <b>${moment().format("YYYY-MM-DD HH:mm")}</b>`, {
                parse_mode: "HTML",
              });
            } else {
              bot.sendMessage(chatId, `Gagal bos : Data tidak sesuai`);
            }
          } catch (error) {
            bot.sendMessage(chatId, `Gagal bos : ${error.message}`);
          }
        })
        .on("error", (error) => {
          console.log(error.message);
          bot.sendMessage(chatId, `Gagal bos : ${error.message}`);
        });
    }
  });

  bot.on("polling_error", (err) => {
    const opts = { parse_mode: "HTML" };
    bot.sendMessage(
      235462443,
      `pooling error, silahkan cek fungsi yang anda buat :\ncode = ${err.code}\nmessage = ${err.message}`,
      opts
    );
  });

  bot.on("error", (err) => {
    const opts = { parse_mode: "HTML" };
    bot.sendMessage(235462443, `ERROR KERAS GAN :\ncode = ${err.code}\nmessage = ${err.message}`, opts);
  });
};

const filterSender = (params, senderUname) => {
  let whitelist = params.config.WHITELIST_SENDER;
  if (whitelist.indexOf(senderUname) >= 0) {
    return true;
  } else {
    return false;
  }
};

const createPdf = async (params, datas) => {
  return new Promise(async (resolve, reject) => {
    let filename = `${params.config.PDF_PATH}${moment().format("YYYY-MM")}_MERGE.pdf`;
    // Create a document
    let doc = new PDFDocument({ margins: { top: 10, left: 100, right: 100, bottom: 10 } });

    const writeStream = fs.createWriteStream(filename);

    doc.pipe(writeStream);

    for (const [index, singleData] of datas.entries()) {
      if (singleData.active == 1) {
        if (singleData.type === "PLN") await params.dependencies.functions("pdf").pln(singleData, doc);
        if (singleData.type === "PDAM") await params.dependencies.functions("pdf").pdam(singleData, doc);
        if (singleData.type === "BPJS") await params.dependencies.functions("pdf").bpjs(singleData, doc);
        if (singleData.type === "TELKOM") await params.dependencies.functions("pdf").telkom(singleData, doc);
        if (index < datas.length - 1) doc.addPage();
      }
    }

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

const sendTelegram = async (params, filename) => {
  try {
    let url = `https://api.telegram.org/bot${params.config.TOKEN_BOT}/sendDocument`;

    const form = new FormData();
    form.append("chat_id", params.config.CHAT_ID);
    form.append("document", fs.createReadStream(filename), {
      filename: `${moment().format("YYYY-MM")}_MERGE.pdf`,
      contentType: "application/pdf",
    });

    const send = await axios.post(url, form);

    return send;
  } catch (err) {
    console.log(err);
    return err;
  }
};
