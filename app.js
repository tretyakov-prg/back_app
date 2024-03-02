require('dotenv').config();
require('./db/db');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3232;

var corsOptions = {
  origin: 'http://localhost:3000',
  //optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(express.static('uploads'));

app.get("/", (req, res) => {
    res.json({ message: "Welcome to application." });
  });

require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
require('./routes/basket.routes')(app);
require('./routes/category.routes')(app);
require('./routes/product.routes')(app);
require('./routes/wishes.routes')(app);

app.listen(port, () => {
    console.log("Load server to port: " + port);
})