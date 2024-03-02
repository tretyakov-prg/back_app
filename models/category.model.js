const mongoose = require("mongoose");

const Category = mongoose.model(
    "Category",
    new mongoose.Schema(
        {
            name: String,
            description: String,
        },
        { collection: 'Category' }
    )
);

module.exports = Category;