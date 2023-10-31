const mongoose = require("mongoose");

const Product = mongoose.model(
    "Product",
    new mongoose.Schema(
        {
            sale: Number,
            url: String,
            image: String,
            title: String,
            category: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Category"
                }
            ],
            description: String,
            price: Number,
            rating: {
                rate: Number,
                count: Number,
            }
        },
        { collection: 'Products' }
    )
);

module.exports = Product;