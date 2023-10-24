const service = require('../services/user.service');
const path = require('path');

exports.userDeleteFile = (req, res) => {
  try {
    var all = service.deleteFile(req);
    return res.status(200).json({ status: 200, data: all, message: "Delete File Success" });
  } catch (e) {
    return res.status(400).json({ status: 400, message: "Files: " + e.message });
  }
};

exports.userUploadFile = (req, res) => {
  try {
    var all = service.uploadFile(req)
    return res.status(200).json({ status: 200, data: all, message: "Upload File Success" });
  } catch (e) {
    return res.status(400).json({ status: 400, message: "Files: " + e.message });
  }
};
  
exports.userDitails = async (req, res) => {
  try {
    var all = await service.getUserDitails(req)
    return res.status(200).json({ status: 200, data: all, message: "Ditails User" });
  } catch (e) {
    return res.status(400).json({ status: 400, message: "Control: " + e.message });
  }
};

exports.userUploadDitails = (req, res) => {
  try {
    var all = service.uploadUserDitails(req)
    return res.status(200).json({ status: 200, data: all, message: "Upload ditails User" });
  } catch (e) {
    return res.status(400).json({ status: 400, message: "Control: " + e.message });
  }
};