const mongoose = require("mongoose");

const Order = mongoose.model(
    "Order",
    new mongoose.Schema(
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
            order: String,
            contact: Object,
            dataBasket: Array
        },
        { collection: 'Orders' }
    )
);

module.exports = Order;