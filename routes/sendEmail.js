const nodemailer = require("nodemailer");
const mailGun = require("nodemailer-mailgun-transport");

const auth = {
  auth: {
    api_key: "bc8a4d59309184b313189408c898515e-913a5827-3721d386",
    domain: "sandboxec4a5f96a42241d5bbb526213ce2bb3c.mailgun.org",
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
