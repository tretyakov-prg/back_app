const service = require('../services/wishes.service');

exports.addWishes = (req, res) => {
    try {
      var all = service.addWishes(req)
      return res.status(200).json({ status: 200, data: all, message: "Add Wishes Item" });
    } catch (e) {
      return res.status(400).json({ status: 400, message: "Control: " + e.message });
    }
  };
  
  exports.deleteWishes = (req, res) => {
    try {
      var all = service.deleteWishes(req)
      return res.status(200).json({ status: 200, data: all, message: "Delete Wishes Item" });
    } catch (e) {
      return res.status(400).json({ status: 400, message: "Control: " + e.message });
    }
  };