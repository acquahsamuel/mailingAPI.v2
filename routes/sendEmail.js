const nodemailer = require("nodemailer");
const mailGun = require("nodemailer-mailgun-transport");
require("dotenv").config();

const auth = {
  auth: {
    api_key: process.env.API_KEY,
    domain: process.env.DOMAIN
  },
};

const nodemailerMailgun = nodemailer.createTransport(mailGun(auth));

const sendEmail = (email, subject, message, response) => {
  const mailOptions = {
    from : email ,
    to: "iamsamuelacquah@gmail.com",
    subject,
    message,
    text: 'Mailgun rocks, pow pow!'
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
