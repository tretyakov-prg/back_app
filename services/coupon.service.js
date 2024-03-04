const db = require("../models");
const Coupon = db.coupon;

exports.getCoupon = async(req, res) => {
    try {
        return await Coupon.find(req.body)
    } catch (error) {
        return {error: 500, message: error}
    }
}

exports.getCouponID = async(req, res) => {
    try {
        const filter = {_id: req.body.id};
        return await Coupon.find(filter)
    } catch (error) {
        return {error: 500, message: error}
    }
}