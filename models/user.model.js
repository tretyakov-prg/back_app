const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
  label: String
});

const User = mongoose.model(
  "User",
  new mongoose.Schema(
    {
      username: String,
      email: String,
      password: String,
      roles: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Role"
        }
      ],
      avatar: String,
      contact: Array,
    },
    { collection: 'Users' }
  )
);

module.exports = User;