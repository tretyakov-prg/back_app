const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.category = require('./category.model');
db.tag = require('./tag.model');
db.product = require('./product.model');
db.wish = require('./wish.model');
db.order = require('./order.model');

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;