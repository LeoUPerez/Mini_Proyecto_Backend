const {Schema, model} = require('mongoose');

const SchemeUser = new Schema({
    keyvalidation: String,
    name: String,
    last_name: String,
    password: String,
    phone: Number,
    mail: String
})

module.exports = model('Usuario', SchemeUser);