const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

app.set("port", process.env.PORT || 3000);

app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API esta en funcionamiento");
});

app.use("/api/usuarios", require("./Routes/Routes_Usuario"));
app.use("/api/realestate", require("./Routes/Routes_RealEstate"));

module.exports = app;
