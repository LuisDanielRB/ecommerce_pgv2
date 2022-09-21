const express = require("express");
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");
const passport = require("passport");
const morgan = require("morgan");
require("dotenv").config();
require("./db.js");
const server = express();
const cors = require("cors");
require("./middleware/authWithJWT");
require("./middleware/authWithGoogle");

server.use(cors());
server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));
server.use(morgan("dev"));
server.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_SECRET],
  })
);
server.use((req, res, next) => {
  //Si en la instruccion de abajo sacamos * y ponemos la url de la pagina sirve para produccion
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});
server.use(passport.initialize());
server.use(passport.session());
// CONEXION DEL ROUTER
server.use("/", require("./router/routers"));

module.exports = server;
