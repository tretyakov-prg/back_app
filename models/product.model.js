const mongoose = require("mongoose");

const Product = mongoose.model(
    "Product",
    new mongoose.Schema(
        {
            sku: String,
            name: String,
            price: Number,
            discount: Number,
            offerEnd: String,
            new: Boolean,
            rating: Number,
            saleCount: Number,
            category: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Category"
                }
            ],
            tag: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Tag"
                }
            ],
            // variation: [
            //     {
            //         type: mongoose.Schema.Types.ObjectId,
            //         ref: "Variation"
            //     }
            // ],
            image:[],
            shortDescription: String,
            fullDescription: String
        },
        { collection: 'Products' }
    )
);

module.exports = Product;