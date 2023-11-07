const db = require("../models");
const Product = db.product;

exports.getProducts = async() => {
    try {
        const filter = {};
        return await Product.find(filter).populate({ path: "category"});
    } catch (error) {
        return {error: 500, message: error}
    }
}

exports.getProductId = async(req) => {
    try {
        return await Product.findById({_id:req.params.id});
    } catch (error) {
        return {error: 500, message: error}
    }
}