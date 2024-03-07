const mongoose = require('mongoose');
const db = require("../models");
const { v4: uuidv4 } = require('uuid');
const Order = db.order;
const Product = db.product;

exports.getPay = async(req, res) => {
    try {
        var now = new Date();
        const dataOrderParams = {
            currency_name: req.body.currency.currencyName,
            currency_rate: req.body.currency.currencyRate,
            email: req.body.biling.email,
            order: uuidv4(),
            items: req.body.order.items,
            status: "process",
            data_create: now
        }
        var arrayIdItem = [];
        req.body.order.items.forEach(element => {
            arrayIdItem.push(element._id);
        });

        const mongoIds = arrayIdItem.map(id => new mongoose.Types.ObjectId(id));

        Product.find({ _id : { $in : mongoIds } })
        .then(result => {

            let allPriceItems = 0;

            result.map((item, idx)=>{

                const quantityItem = req.body.order.items.find(itemArray => itemArray._id === (item._id).toString())

                if(item.discount !== 0)
                {
                    allPriceItems += quantityItem.quantity * (item.price - item.price*(item.discount/100));
                }
                else
                {
                    allPriceItems += quantityItem.quantity * item.price
                }
            })           
            const resultDataOrder = {...dataOrderParams, price: (allPriceItems * req.body.currency.currencyRate).toFixed(2)}
            Order.create(resultDataOrder)
        })
        return {message: "New Order created"}
    } catch (error) {
        return {error: 500, message: error}
    }
}

exports.getStatusPay = async(req, res) => {
    const data = await Order.findOne({order: req.params.status});
    return {status: data.status, create: data.data_create.toString()};
}