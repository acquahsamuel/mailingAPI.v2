const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const emailSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    maxlength: 60,
  },
  subject: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

const Email = mongoose.model("Email", emailSchema);

function validateEmail(email) {
  const schema = {
    email: Joi.string().max(50).required(),
    subject: Joi.text().required(),
    message: Joi.string().required(),
  };
  return Joi.validate(email, schema);
}

exports.Email = Email;
exports.validate = validateEmail;
