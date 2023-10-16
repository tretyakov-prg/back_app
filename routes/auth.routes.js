const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");

const URL_PATH = process.env.URL_AUTHPATH;

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(`${URL_PATH}/register`, [ verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRolesExisted], controller.register );

  app.post(`${URL_PATH}/signin`, controller.login);
};