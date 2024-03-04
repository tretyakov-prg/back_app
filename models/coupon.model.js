const mongoose = require("mongoose");

const Coupon = mongoose.model(
    "Coupon",
    new mongoose.Schema(
        {
            code: String,
            desc: String,
            active: Boolean
        },
        { collection: 'Coupons' }
    )
);

module.exports = Coupon;