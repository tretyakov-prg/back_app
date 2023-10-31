const mongoose = require("mongoose");

const Wish = mongoose.model(
    "Wish",
    new mongoose.Schema(
        {
            userid: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
            wishes: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    id: "Product"
                }
            ]
        },
        { collection: 'Wishes' }
    )
);

module.exports = Wish;