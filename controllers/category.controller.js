const service = require('../services/category.service');

exports.getCategpry = async (req, res) => {
    try {
      var data = await service.getCategory(req)
      return res.status(200).json({ status: 200, data, message: "Get Category" });
    } catch (e) {
      return res.status(400).json({ status: 400, message: "Control: " + e.message });
    }
  };