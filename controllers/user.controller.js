const service = require('../services/user.service');

exports.allAccess = (req, res) => {
  try {
    var all = service.allAccess()
    return res.status(200).json({ status: 200, data: all, message: "List all Users" });
  } catch (e) {
      return res.status(400).json({ status: 400, message: "Control: " + e.message });
  }
};

exports.userGetFiles = (req, res) => {
  try {
    var all = service.getFiles()
    return res.status(200).json({ status: 200, data: all, message: "Get data Files" });
  } catch (e) {
      return res.status(400).json({ status: 400, message: "Files: " + e.message });
  }
};

exports.userUploadFiles = (req, res) => {
  try {
    var all = service.uploadFiles()
    return res.status(200).json({ status: 200, data: all, message: "Upload Files" });
  } catch (e) {
      return res.status(400).json({ status: 400, message: "Files: " + e.message });
  }
};
  
exports.userBoard = async (req, res) => {
  try {
    var all = await service.getUsers(req)
    return res.status(200).json({ status: 200, data: all, message: "Ditails User" });
  } catch (e) {
      return res.status(400).json({ status: 400, message: "Control: " + e.message });
  }
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};

exports.routeAdmin = (req, res) => {
  res.status(200).send({
    "denis":"admin",
    "mama":"user"
  });
};