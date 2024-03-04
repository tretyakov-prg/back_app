const db = require("../models");
//const Product = db.product;

exports.getPay = async(req, res) => {
    try {
        console.log(req.body);
        // const filter = {_id: "65d34dac1db558e1cd21cf43"};
        // return await Product.find().
        // populate({ path: "category"}).
        // populate({ path: "tag"});
        return await req.body;
    } catch (error) {
        return {error: 500, message: error}
    }
}