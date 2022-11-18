const nodemailer = require("nodemailer");
const moment = require("moment");

exports.sendPdf = async (filename) => {
  const mailOptions = {
    from: '"Developer" <dev-marsyofie@outlook.com>', // sender address
    to: process.env.MAIL_TO, // list of receivers
    subject: `Struk Tagihan Bulan ${moment().format("YYYY-MM")}`, // Subject line
    text: 'This template is used for the "text" field',
    attachments: [
      {
        filename: `${moment().format("YYYY-MM")}_MERGE.pdf`,
        path: filename,
      },
    ],
  };
  let resp = await wrapedSendMail(mailOptions);
};

const wrapedSendMail = async (mailOptions) => {
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      // host: process.env.MAIL_HOST,
      // port: process.env.MAIL_PORT,
      service: "Outlook365",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
      debug: process.env.NODE_ENV === "production" ? false : true,
    });

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(`ERROR SEND MAIl : ${err}`);
        resolve(false);
      } else {
        console.log(`SUKSES SEND MAIl : ${info}`);
        resolve(true);
      }
    });
  });
};
