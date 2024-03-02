const mongoose = require("mongoose");

const Tag = mongoose.model(
    "Tag",
    new mongoose.Schema(
        {
            name: String,
            description: String,
        },
        { collection: 'Tag' }
    )
);

module.exports = Tag;