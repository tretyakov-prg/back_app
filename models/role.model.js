const mongoose = require("mongoose");

const Role = mongoose.model(
  "Role",
  new mongoose.Schema(
    {
      name: String
    },
    { collection: 'Roles' }
  )
);

module.exports = Role;