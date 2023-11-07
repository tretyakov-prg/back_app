const mongoose = require("mongoose");

const Category = mongoose.model(
    "Category",
    new mongoose.Schema(
        {
            name: String,
            description: String,
            products: [
                {
                  type: mongoose.Schema.Types.ObjectId,
                  ref: "Product"
                }
            ]
        },
        { collection: 'Categorys' }
    )
);

module.exports = Category;