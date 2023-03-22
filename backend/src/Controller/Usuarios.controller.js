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
      balance: 0
    });
    NewUser.save();
    res.json({ message: "El usuario ha sido guardao" });
    // console.log(token);
  });
}

usuario.ProfileUser = async (req, res) => {
  const nameuser = req.params.id;
  const Usuario = await modelo.find({name: nameuser});
  const DataUser = [Usuario[0].name, Usuario[0].last_name, Usuario[0].mail, Usuario[0].phone, Usuario[0].card.balance];
  res.send(DataUser)

}

usuario.Get_user_mail = async (req, res) => {
  //! El usuario se obtendra mediante el correo
  const { user_mail } = req.body;
  const values = [user_mail];


  const usuario = await modelo.find({ mail: user_mail });
  if (usuario.length > 0) {
    SendMail(user_mail);
    aux = user_mail;
    res.send(usuario[0].keyvalidation);
    // console.log(usuario[0].keyvalidation);
  } else {
    res.json({ message: "user not found" });
  }
};
usuario.UpdateUsuario = async (req, res) => {
  let card_number, expiration_year, expiration_month, verification_code, balance;
  const token = req.params.id;
  const verify = jwtv.decode(token)
  console.log(verify);
  console.log(token);
  let change = ''

  if (verify!==null) {
    const usuario = await modelo.find({ keyvalidation: token });
    if (req.body.password === undefined) {
      change=usuario[0].password;
      card_number=req.body.card_number;
      expiration_year=req.body.expiration_year;
      expiration_month=req.body.expiration_month;
      verification_code=req.body.verification_code;
      balance=req.body.balance;
    }else{
      change=req.body.password;
      card_number=usuario[0].card.card_number;
      expiration_year=usuario[0].card.expiration_year;
      expiration_month=usuario[0].card.expiration_month;
      verification_code=usuario[0].card.verification_code;
      balance=usuario[0].card.balance;
    }

    const NewUser = await modelo.updateOne(
      { _id: usuario[0]._id },
      {
        $set: {
          keyvalidation: usuario[0].keyvalidation,
          name: usuario[0].name,
          last_name: usuario[0].last_name,
          password: change,
          phone: usuario[0].phone,
          mail: usuario[0].mail,
          card: {
            card_number: card_number,
            expiration_year: expiration_year,
            expiration_month: expiration_month,
            verification_code: verification_code,
            balance: balance
          }
        }
      },
      {upsert: true}
    );
  
    console.log(NewUser);
    res.send({ message: "Usuario Actualizado" });
    aux = "";
  }else{
    res.json({message: "Token not valid"})
  }

};

//TODO: --IMPORTANTE--    Falta crear clave y crear verificacion    --IMPORTANTE--
usuario.Verify_Code = async (req, res) => {
  const token = req.params.id;
  const verify = jwtv.decode(token)

  if (verify!==null) {
    const codeUser = req.body;
    if (code !== codeUser.code) {
      res.send({ message: "Incorrect verification code" });
    } else {
      res.send(codeUser);
    }
  }else{
    res.json({message: "Token not valid"})
  }


};

SendMail = async (correo) => {
  let plantilla = `<html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </head>
  <body>
      <div style=" width: 100%; height: 27rem; display: flex; justify-content: center; align-items: center; flex-direction: column; gap: 2%;">
          <div style="width:89%; height: 2.8rem; border-bottom: 2px solid black; display: flex; align-items: center; margin-top: .3%;">
              <img style="padding-left: 1%; height: 3rem;" src="https://www.pngplay.com/wp-content/uploads/7/Building-Vector-PNG-HD-Quality.png" alt="">
          </div>
          <div style="width: 88%; height: 1.5rem; display: flex; align-items: center;">
              <h3 style="font-family: Arial, Helvetica, sans-serif; font-size: 15px;">Your verification code is:</h3>
          </div>
          <div style="width:90%; height: 85%; margin-bottom: 1%; border-radius: 1rem; border: solid 2px black; display: flex; justify-content: center; align-items: center;">
              <h1 style="font-family: Arial, Helvetica, sans-serif; color: blue;">${code} </h1>
          </div>
          <div style="width: 100%; height: 7rem; font-family: Arial, Helvetica, sans-serif; font-size: 9.8px; text-align: center;">
          This message has been sent to <a style="color: blue;">${correo}</a>. If you do not wish to receive these emails from Meta in the future, please unsubscribe.
          Real State Platforms, Inc., Attention: Community Support,
          To protect your account, please do not forward this email. More information.
          </div>
      </div>
  </body>
  </html>`
  // ! Es la configuracion que exige nodemailer para el envio del correo.
  // * Se debe crear la clave temporal en google para las aplicaciones, además de que se debe asignar la ip en uso en mongoDB atlas a la hora de hacer peticiones al backend
  const confing = {
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: "state.real.inf@gmail.com",
      pass: "znyaxxuztgwrepuz", //TODO => Crear contraseña de aplicaciones temporal
    },
  };
  const transport = nodemailer.createTransport(confing);

  const mensaje = {
    from: "state.real.inf@gmail.com",
    to: correo,
    html: plantilla,
    subject: "Verification code",

    // text: `Your verification code is: ${code}`
  };
  const info = await transport.sendMail(mensaje);

};

module.exports = usuario;
