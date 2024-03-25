const service = require('../services/product.service');

exports.getProducts = async (req, res) => {
    try {
      var data = await service.getProducts(req)
      return res.status(200).json({ status: 200, data, message: "Get Products" });
    } catch (e) {
      return res.status(400).json({ status: 400, message: "Control: " + e.message });
    }
  };
  
  exports.getProductId = async (req, res) => {
    try {
      var data = await service.getProductId(req)
      return res.status(200).json({ status: 200, data, message: "Get Product to ID" });
    } catch (e) {
      return res.status(400).json({ status: 400, message: "Control: " + e.message });
    }
  };

  exports.getProductSearch = async (req, res) => {
    try {
      var data = await service.getProductSearch(req)
      return res.status(200).json({ status: 200, data, message: "Get Search to Product" });
    } catch (e) {
      return res.status(400).json({ status: 400, message: "Control: " + e.message });
    }
  };