const {Schema, model} = require('mongoose');

const SchemeUser = new Schema({
    keyvalidation: String,
    nombre: String,
    apellido: String,
    password: String,
    telefono: Number,
    correo: String
})

module.exports = model('Usuario', SchemeUser);