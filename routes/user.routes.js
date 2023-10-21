const express = require('express');
const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");
const upload = require("../middlewares/uploadImage");

const URL_USERPATH = process.env.URL_USERPATH;

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(`${URL_USERPATH}/all`,                                                             controller.allAccess);

  app.post(`${URL_USERPATH}/ditails`,            [authJwt.verifyToken],                      controller.userDitails);

  app.delete(`${URL_USERPATH}/upload`,           [authJwt.verifyToken],                      controller.userDeleteFile);

  app.post(`${URL_USERPATH}/upload`,             [authJwt.verifyToken], [upload],            controller.userUploadFile);

  app.get(`${URL_USERPATH}/mod`,                 [authJwt.verifyToken, authJwt.isModerator], controller.moderatorBoard );

  app.get(`${URL_USERPATH}/admin`,               [authJwt.verifyToken, authJwt.isAdmin],     controller.adminBoard);

  app.get(`${URL_USERPATH}/rols`,                [authJwt.verifyToken, authJwt.isAdmin],     controller.routeAdmin);

};