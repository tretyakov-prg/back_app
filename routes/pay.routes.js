const controller = require("../controllers/pay.controller");

const URL_USERPATH = process.env.URL_USERPATH;

module.exports = function(app) {

  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(`${URL_USERPATH}/pay`,               controller.getPay);
  app.get(`${URL_USERPATH}/paystatus/:status`,  controller.getStatusPay);
};