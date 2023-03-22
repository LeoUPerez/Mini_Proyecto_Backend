const nodemailer = require('nodemailer');

const Real_Estate = {};

const model = require('../Models/ModelRealEstate.js')


Real_Estate.Get_Real_Estate = async (req, res) => {
    const realestates = await model.find();
    res.json(realestates)
};
Real_Estate.Put_Create_Act = async (req, res) => {
    const {Code, Property_type, City, Sector, Bedrooms, Bathrooms, Parking, Construction, Description, ImageURL, Status, Price} = req.body;
    // console.log(Price);
    const NewRealEstate = await model.updateOne(
        {_id: Code},
        {
          $set:{
            Property_type: Property_type,
            City: City,
            Sector: Sector,
            Bedrooms: Bedrooms,
            Bathrooms: Bathrooms,
            Parking: Parking,
            Construction: Construction,
            Description: Description,
            ImageURL: ImageURL,
            Status: Status,
            Price: Price
          }
        },
        {upsert: true}
        )

    res.send('Real estate entered correctly')
}

Real_Estate.Contact = async (req, res) => {
    const { name, lastname, mail, message } = req.body;

    const confing = {
      host: "smtp.gmail.com",
      port: 587,
      auth: {
          user: "state.real.inf@gmail.com",
          pass: "znyaxxuztgwrepuz"
      }
  }
  const transport = nodemailer.createTransport(confing);

  const mensaje = {
      from : mail,
      to : "state.real.inf@gmail.com",
      subject : `Real Estate Info | ${name} ${lastname} ${mail}`,
      text: message
  }
  const info = await transport.sendMail(mensaje);

    console.log(info);
    res.send("Message sent successfully")
}


module.exports = Real_Estate;