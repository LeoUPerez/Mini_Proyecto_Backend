const { Schema, model } = require("mongoose");

const SchemeUser = new Schema({
  keyvalidation: String,
  name: String,
  last_name: String,
  password: String,
  phone: Number,
  mail: String,
  card: {
    card_number: Number,
    expiration_year: Number,
    expiration_month: Number,
    verification_code: Number,
    balance: Number,
  },
});

module.exports = model("Usuario", SchemeUser);
