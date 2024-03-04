const controller = require("../controllers/coupon.controller");

const URL_USERPATH = process.env.URL_USERPATH;

module.exports = function(app) {

  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(`${URL_USERPATH}/coupon`,        controller.getCoupon);

  app.post(`${URL_USERPATH}/coupon/:id`,  controller.getCouponID);

};