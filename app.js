require('dotenv').config();
require('./db/db');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3232;

// var corsOptions = {
//   origin: "http://localhost:3000"
// };

app.use(cors());

app.use(bodyParser.json());

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({ message: "Welcome to application." });
  });
// routes
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

app.listen(port, () => {
    console.log("Load server to port: " + port);
})