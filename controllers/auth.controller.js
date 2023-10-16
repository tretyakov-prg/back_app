const service = require('../services/auth.service');

exports.login = (req, res) => {
  try {
    service.login(req)
    .then(result => {
      return res.status(200).json({ status: 200, data: result, message: "Login user!" });
    })
    
  } catch (e) {
      return res.status(400).json({ status: 400, message: "Control: " + e.message });
  }
};

exports.register = (req, res) => {
  try {
    var all = service.register(req)
    return res.status(200).json({ status: 200, data: all, message: "Register User" });
  } catch (e) {
      return res.status(400).json({ status: 400, message: "Control: " + e.message });
  }
};