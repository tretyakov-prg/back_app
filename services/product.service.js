const db = require("../models");
const Product = db.product;

exports.getProducts = async() => {
    try {
        const filter = {_id: "65d34dac1db558e1cd21cf43"};
        return await Product.find().
        populate({ path: "category"}).
        populate({ path: "tag"});
    } catch (error) {
        return {error: 500, message: error}
    }
}

exports.getProductId = async(req) => {
    try {
        const filter = {_id: req.params.id};
        return await Product.findById(filter);
    } catch (error) {
        return {error: 500, message: error}
    }
}