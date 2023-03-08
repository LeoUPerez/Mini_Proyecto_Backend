const jwtv = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const code = "0000";
var aux = "";

const usuario = {};

const modelo = require("../Models/ModelUsuarios.js");

usuario.Get_user = async (req, res) => {
  const { username, password } = req.body;
  const values = [username, password];

  const usuario = await modelo.find({ name: username, password: password });
  if (usuario.length > 0) {
    let jwt = usuario[0].keyvalidation;
    res.send(jwt);
  } else {
    res.json({ message: "user not found" });
  }
};

usuario.CreateUser = async (req, res) => {
  jwt(req, res);
};
function jwt(req, res) {
  jwtv.sign({ user: modelo }, "secretkey", (err, token) => {
    const { username, last_name, password, phone, mail } = req.body;
    const NewUser = new modelo({
      keyvalidation: token,
      name: username,
      last_name: last_name,
      password: password,
      phone: phone,
      mail: mail,
    });
    NewUser.save();
    res.json({ message: "El usuario ha sido guardao" });
    // console.log(token);
  });
}

usuario.Get_user_mail = async (req, res) => {
  //! El usuario se obtendra mediante el correo
  const { user_mail } = req.body;
  const values = [user_mail];

  const usuario = await modelo.find({ mail: user_mail });
  if (usuario.length > 0) {
    SendMail(user_mail);
    aux = user_mail;
    res.send(usuario);
  } else {
    res.json({ message: "user not found" });
  }
};
usuario.UpdateUsuario = async (req, res) => {
  const usuario = await modelo.find({ mail: aux });

  const NewUser = await modelo.updateOne(
    { _id: usuario[0]._id },
    {
      $set: {
        keyvalidation: usuario[0].keyvalidation,
        name: usuario[0].name,
        last_name: usuario[0].last_name,
        password: req.body.password,
        phone: usuario[0].phone,
        mail: usuario[0].mail,
      },
    }
  );

  console.log(NewUser);
  res.send({ mensaje: "Usuario Actualizado" });

  aux = "";
};

//TODO: --IMPORTANTE--    Falta crear clave y crear verificacion    --IMPORTANTE--
usuario.Verify_Code = async (req, res) => {
  const codeUser = req.body;
  if (code !== codeUser.code) {
    res.send({ message: "Incorrect verification code" });
  } else {
    res.send(codeUser);
  }
};

SendMail = async (correo) => {
  // ! Es la configuracion que exige nodemailer para el envio del correo.
  // * Se debe crear la clave temporal en google para las aplicaciones, además de que se debe asignar la ip en uso en mongoDB atlas a la hora de hacer peticiones al backend
  const confing = {
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: "soysuperez59449@gmail.com",
      pass: "zprzcpkqamdjcocd", //TODO => Crear contraseña de aplicaciones temporal
    },
  };
  const transport = nodemailer.createTransport(confing);

  const mensaje = {
    from: "soysuperez59449@gmail.com",
    to: correo,
    subject: "Código de verificación",
    text: `Su código de verificacón es: ${code}`,
  };
  const info = await transport.sendMail(mensaje);

  // console.log(info);
};

module.exports = usuario;
