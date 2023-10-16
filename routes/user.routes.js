const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");

const URL_USERPATH = process.env.URL_USERPATH;

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(`${URL_USERPATH}/all`,                                              controller.allAccess);

  app.post(`${URL_USERPATH}/ditails`, [authJwt.verifyToken],                  controller.userBoard);

  app.get(`${URL_USERPATH}/files`, [authJwt.verifyToken],                     controller.userGetFiles);

  app.post(`${URL_USERPATH}/upload`, [authJwt.verifyToken],                    controller.userUploadFiles);

  app.get(`${URL_USERPATH}/mod`,  [authJwt.verifyToken, authJwt.isModerator], controller.moderatorBoard );

  app.get(`${URL_USERPATH}/admin`,[authJwt.verifyToken, authJwt.isAdmin],     controller.adminBoard);

  app.get(`${URL_USERPATH}/rols`, [authJwt.verifyToken, authJwt.isAdmin],     controller.routeAdmin);

};