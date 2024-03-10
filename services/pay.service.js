const mongoose = require('mongoose');
const db = require("../models");
const { v4: uuidv4 } = require('uuid');
const {CreateHTMLOrderlight} = require('../middlewares/createPageToOrderListLight');
const {SendMailBasket, SendMailNodemaler, SendMailAxios} = require("../middlewares/sendMail");
const Order = db.order;
const Product = db.product;

exports.getPay = async(req, res) => {
    try {
        var now = new Date();
        const dataOrderParams = {
            currency_name: req.body.currency ? req.body.currency.currencyName : "$",
            currency_rate: req.body.currency ? req.body.currency.currencyRate : 1,
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

            const resultDataOrder = {...dataOrderParams, price: (allPriceItems * dataOrderParams.currency_rate).toFixed(2)}
            // Order.create(resultDataOrder)
            // SendMailBasket(CreateHTMLOrder({
            //     item:result, 
            //     quantity: dataOrderParams.items,
            //     currency_name: dataOrderParams.currency_name,
            //     price: (allPriceItems * dataOrderParams.currency_rate).toFixed(2)
            // }), dataOrderParams)
            // .then(resp => console.log(resp))
            // .catch(err => console.log(err));
            const sendDataContact = {
                name:"Denis",
                email:"tridenis@yandex.ru"
            }
            const orderHtml = "<p>Hello denis</p>"
            //SendMailBasket(orderHtml, sendDataContact).then(res => console.log(res)).catch(err => console.log(err));
            SendMailNodemaler(CreateHTMLOrderlight({
                    item:result, 
                    quantity: dataOrderParams.items,
                    currency_name: dataOrderParams.currency_name,
                    price: (allPriceItems * dataOrderParams.currency_rate).toFixed(2)
                }));
            //SendMailAxios();
            
        })
        
        return {message: "New Order created"}
    } catch (error) {
        console.log(error)
        return {error: 500, message: error}
    }
}

exports.getStatusPay = async(req, res) => {
    const data = await Order.findOne({order: req.params.status});
    return {status: data.status, create: data.data_create.toString()};
}