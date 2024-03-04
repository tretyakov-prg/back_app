const service = require('../services/pay.service');

exports.getPay = async (req, res) => {
    try {
      var data = await service.getPay(req)
      return res.status(200).json({ status: 200, data, message: "Get Pay" });
    } catch (e) {
      return res.status(400).json({ status: 400, message: "Control: " + e.message });
    }
};