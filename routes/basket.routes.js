const { authJwt } = require("../middlewares");
const controller = require("../controllers/basket.controller");

const URL_USERPATH = process.env.URL_USERPATH;

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.put(`${URL_USERPATH}/basket`,     [authJwt.verifyToken],            controller.addBasket);

  app.get(`${URL_USERPATH}/basket`,     [authJwt.verifyToken],            controller.getBasket);

};