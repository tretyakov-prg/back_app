const service = require('../services/coupon.service');

exports.getCoupon = async (req, res) => {
    try {
      var data = await service.getCoupon(req)
      return res.status(200).json({ status: 200, data, message: "Get Coupon" });
    } catch (e) {
      return res.status(400).json({ status: 400, message: "Control: " + e.message });
    }
};
exports.getCouponID = async (req, res) => {
    try {
      var data = await service.getCouponID(req)
      return res.status(200).json({ status: 200, data, message: "Get Coupon" });
    } catch (e) {
      return res.status(400).json({ status: 400, message: "Control: " + e.message });
    }
};