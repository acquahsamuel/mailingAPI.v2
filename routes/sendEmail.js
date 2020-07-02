const nodemailer = require("nodemailer");
const mailGun = require("nodemailer-mailgun-transport");
const config = require("dotenv").config();

const auth = {
  auth: {
    api_key: process.env.API_KEY,
    domain: process.env.DOMAIN,
  },
};

const nodemailerMailgun = nodemailer.createTransport(mailGun(auth));

const sendEmail = (from, to, subject, message, response) => {
  const mailOptions = {
    from: from,
    to: to,
    subject: subject,
    // text: message, //Use this if message is without html option
    html: message,
  };

  nodemailerMailgun.sendMail(mailOptions, function (error, data) {
    if (error) {
      response(error, null);
    } else {
      response(null, data);
    }
  });
};

module.exports = sendEmail;
