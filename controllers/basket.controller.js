const service = require('../services/basket.service');

exports.addBasket = (req, res) => {
    try {
      var all = service.addBasket(req)
      return res.status(200).json({ status: 200, data: all, message: "Add Basket Item" });
    } catch (e) {
      return res.status(400).json({ status: 400, message: "Control: " + e.message });
    }
};

exports.getBasket = async (req, res) => {
  try {
    var all = await service.getBasket(req)
    console.log(all)
    return res.status(200).json({ status: 200, data: all, message: "Get Basket Orders" });
  } catch (e) {
    return res.status(400).json({ status: 400, message: "Control: " + e.message });
  }
};