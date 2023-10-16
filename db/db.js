require('dotenv').config();
const mongoose = require('mongoose');
const db = require("../models");
const Role = db.role;

const user = process.env.MONGO_USERNAME;
const pass = process.env.MONGO_PASSWORD;
const host = process.env.MONGO_HOSTNAME;
const port = process.env.MONGO_PORT;
const dbo  = process.env.MONGO_DB;

const con_string1 = `mongodb://${user}:${pass}@${host}:${port}/${dbo}?authMechanism=DEFAULT&authSource=admin`;

mongoose
  .connect(con_string1, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error---", err);
    process.exit();
  });

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    console.log(err + "-: " + count);
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "moderator"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'moderator' to roles collection");
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}