const db = require("../models");
const Product = db.product;

exports.getProducts = async() => {
    try {
        return await Product.find()
        .populate({ path: "category"})
        .populate({ path: "tag"});
    } catch (error) {
        return {error: 500, message: error}
    }
}

exports.getProductId = async(req) => {
    try {
        return await Product.findById({_id: req.params.id});
    } catch (error) {
        return {error: 500, message: error}
    }
}

exports.getProductSearch = async(req) => {
    try {
        return await Product.find({$text : {$search: req.body.search}})
        .populate({ path: "category"})
        .populate({ path: "tag"});
    } catch (error) {
        return {error: 500, message: error}
    }
}