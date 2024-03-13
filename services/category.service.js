const mongoose = require('mongoose');
const db = require("../models");
const Product = db.product;


// {$and: [{category: ObjectId('65dedc93f8fd1ac532e9b036')}]}
exports.getCategory = async(req) => {
    try {
        const filter = {$and: [{category: new mongoose.Types.ObjectId(req.params.id)}]};
        return await Product.find(filter).
        populate({ path: "category"}).
        populate({ path: "tag"});
    } catch (error) {
        return {error: 500, message: error}
    }
}