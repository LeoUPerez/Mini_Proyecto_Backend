const mongoose = require("mongoose");

const URI =
  "mongodb+srv://Leo:Fabiolaperez1@personalcluster.cgy24qg.mongodb.net/Mini_Proyecto";

mongoose.set("strictQuery", false);
mongoose.connect(URI);

const connection = mongoose.connection;

connection.once("open", () => {
  console.log(`Conectado a la base de datos ${URI}`);
});
