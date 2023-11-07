const db = require("../models");
const Category = db.category;

exports.getCategory = async() => {
    try {
        const filter = {};
        return await Category.find(filter);
    } catch (error) {
        return {error: 500, message: error}
    }
}