const db = require("../models");
const User = db.user;

exports.addWishes = async(req) => {
    try {
        await User.findByIdAndUpdate(
            req.headers["id-user"], 
            {
                $push: {
                    wishlist: req.body
                }
            },
            {useFindAndModify: false});
        return {message: "Wishes item added to user"};
    } catch (error) {
        return {error: 500, message: error}
    }
}

exports.deleteWishes = async(req) => {
    try {
        await User.findByIdAndUpdate(
            req.headers["id-user"], 
            {
                $pull: {
                    wishlist: { 
                        _id: req.body.id
                    }
                }
            }, 
            {useFindAndModify: false});
        return {message: "Wishes item delete to user"};
    } catch (error) {
        return {error: 500, message: error}
    }
}