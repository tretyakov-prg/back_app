const db = require("../models");
const Order = db.order;

exports.addBasket = async(req) => {
    try {
        //req.headers["id-user"]
        const {order, obj, dataBaskets} = req.body;

        const orderBlank = new Order({
            user: req.headers["id-user"],
            order: order,
            contact: obj,
            dataBasket: dataBaskets
        });

        orderBlank.save()
        return {message: "Order added to Orders"};
    } catch (error) {
        return {error: 500, message: error}
    }
}

exports.getBasket = async(req, res) => {
    try {
        const basketlist = async() => await Order.find({user : req.headers["id-user"]})//.populate("user", "-__v");
        return basketlist()
        .then((bask) => {
            if (!bask) { 
                return { error: 500, message: "User Not found." } 
            }
            return bask;
        })
        .catch(err => console.log(err))
    } catch (error) {
        return {error: 500, message: error}
    }
}