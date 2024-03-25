const mongoose = require("mongoose");

const Order = mongoose.model(
    "Order",
    new mongoose.Schema(
        {
            email: String,
            order: String,
            items: [
                {
                    _id: { type: mongoose.Schema.Types.ObjectId, ref: "Products" },
                    quantity: Number
                }
            ],
            price: Number,
            status: String,
            currency_name: String,
            currency_rate: Number,
            data_create: Date,
            data_done: Date
        },
        { collection: 'Orders' }
    )
);

module.exports = Order;